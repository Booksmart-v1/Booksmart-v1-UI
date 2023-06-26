import {
  IonContent,
  IonText,
  IonPage,
  IonButton,
  IonIcon,
  IonItem,
  IonInput,
  IonToast,
  IonItemDivider,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Onboard.css";
import {
  arrowBackOutline,
  arrowForward,
  informationCircle,
} from "ionicons/icons";
import { SmsRetriever } from "@ionic-native/sms-retriever";
// import OtpInput from "react-otp-input";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../constants";
import { saveTokens } from "../../common/authToken";

interface UserDetailPageProps
  extends RouteComponentProps<{
    page: string;
  }> {}

const Onboard: React.FC<UserDetailPageProps> = ({ match }) => {
  const [page, setPage] = useState("signup");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [id, setID] = useState(null);
  const [showToast1, setShowToast1] = useState(false);
  const [msg, setMsg] = useState("");
  const handleChange = (num: string) => setOtp(num);
  const history = useHistory();

  useEffect(() => {
    SmsRetriever.getAppHash()
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(match.params.page);
    setPage(match.params.page);
  }, [match.params.page]);

  const start = () => {
    SmsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        processSMS(res);
      })
      .catch((error: any) => console.error(error));
  };

  const processSMS = (data: any) => {
    const message = data.Message;
    if (message !== -1) {
      setOtp(message.slice(44, 50));
      console.log(otp);
      // handleClick();
      // setOTPMessage('OTP received. Proceed to register');
      // presentToast('SMS received with correct app hash', 'bottom', 1500);
    }
  };

  const handleClick = () => {
    if (!otpSent) {
      if (page === "signup") {
        let url: string = APIURL + "v2/addUser";

        axios
          .post(url, {
            name: name,
            email: email,
            mobile: phone,
          })
          .then((res) => {
            console.log(res);
            setMsg(res.data.message);
            if (res.status === 200) {
              setOtpSent(true);
              setID(res.data.data.userId);
              start();
            }
            setShowToast1(true);
          })
          .catch((e) => {
            setMsg(e.message);
            setShowToast1(true);
            console.log(e);
          });
      } else {
        let url: string = APIURL + "v2/loginUser";
        axios
          .post(url, {
            mobile: phone,
          })
          .then((res) => {
            console.log(res);

            if (res.status === 200) {
              setOtpSent(true);
              setID(res.data.data.userId);
              start();
              setMsg(res.data.message);
            }
            setShowToast1(true);
          })
          .catch((e) => {
            setMsg("Please sign up first!");
            setShowToast1(true);
            console.log(e);
          });
      }
    } else {
      let url: string = APIURL + "v2/verifyUser";
      axios
        .post(url, {
          userId: id,
          otp: otp,
        })
        .then((res) => {
          console.log(res);
          setMsg(res.data.message);
          if (res.status === 200) {
            setOtpSent(false);
            localStorage.setItem("chatToken", res.data.data.token);
            console.log(res.data.data.token);
            const user = {
              id: res.data.data.userId,
              name: res.data.data.name,
              email: res.data.data.email,
            };
            saveTokens(res.data.data.authToken, res.data.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(user));
            if (page === "signup") {
              history.push("/avatar");
            } else history.push("/homepage");
          }
          setShowToast1(true);
        })
        .catch((e) => {
          setShowToast1(true);
          console.log(e);
        });
    }
  };

  return (
    <>
      <IonPage>
        <IonContent
          className="md bg ion-no-padding"
          scrollY={false}
          style={{
            "--background":
              "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(https://innovationinpolitics.eu/wp-content/uploads/2020/03/jaredd-craig-HH4WBGNyltc-unsplash-1024x1536.jpg) no-repeat center center / cover",
          }}
        >
          <div className="bod">
            <IonButton
              fill="clear"
              color="dark"
              slot="start"
              onClick={() => {
                otpSent ? setOtpSent(!otpSent) : history.goBack();
                setPhone("");
              }}
              style={{
                marginRight: "320px",
                marginTop: "-80px",
                border: "none",
                fontWeight: "bold",
              }}
            >
              <IonIcon slot="icon-only" color="light" icon={arrowBackOutline} />
            </IonButton>

            {otpSent ? (
              <>
                <IonText className="login-text">
                  {" "}
                  Please enter a 6 digit OTP that has been sent to your
                  registered mobile number.
                </IonText>
                <IonItem style={{ marginTop: "10px", width: "70%" }}>
                  <IonInput
                    type="text"
                    value={otp}
                    placeholder="* * * * * *"
                    onIonChange={(e: any) => {
                      setOtp(e.target.value);
                    }}
                    required
                  ></IonInput>
                </IonItem>
              </>
            ) : (
              <>
                <IonText className="login-text">
                  {page === "signup"
                    ? "Welcome to Booksmart!"
                    : "Welcome to Booksmart! Please enter your mobile number to continue."}
                </IonText>

                <IonItemDivider
                  style={{ width: "85%", margin: "12px auto" }}
                ></IonItemDivider>
                {page === "signup" ? (
                  <>
                    <div style={{ margin: "50px 0 0 110px", width: "100%" }}>
                      <div className="number">
                        <p
                          style={{
                            fontFamily: "Montserrat-SB !important",
                            fontWeight: "bold",
                            fontSize: "18",
                          }}
                        >
                          {"Full Name"}
                        </p>
                        <IonItem style={{ marginTop: "10px", width: "100%" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            type="text"
                            value={name}
                            placeholder="Enter Full Name"
                            onIonChange={(e: any) => {
                              setName(e.target.value);
                            }}
                            required
                          ></IonInput>
                        </IonItem>
                      </div>
                      <div className="number">
                        <p
                          style={{
                            fontFamily: "Montserrat-SB !important",
                            fontWeight: "bold",
                            fontSize: "18",
                          }}
                        >
                          {"Email"}
                        </p>
                        <IonItem style={{ marginTop: "10px", width: "100%" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            type="text"
                            value={email}
                            placeholder="Enter email"
                            onIonChange={(e: any) => {
                              setEmail(e.target.value);
                            }}
                            required
                          ></IonInput>
                        </IonItem>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="number">
                  <p
                    style={{
                      fontFamily: "Montserrat-SB !important",
                      fontWeight: "bold",
                      fontSize: "18",
                    }}
                  >
                    {"Mobile"}
                  </p>
                  <IonItem style={{ marginTop: "10px" }}>
                    {/* <IonLabel position="floating"> Email</IonLabel> */}
                    <IonInput
                      type="number"
                      maxlength={10}
                      value={phone}
                      placeholder="Enter number"
                      onIonChange={(e: any) => {
                        setPhone(e.target.value);
                      }}
                      required
                    >
                      +91 &nbsp;&nbsp;{" "}
                    </IonInput>
                  </IonItem>
                </div>
              </>
            )}
            <div className="number1">
              <IonButton
                expand="block"
                onClick={handleClick}
                style={{
                  marginTop: "10px",
                  "--background": "white",
                  fontFamily: "Montserrat-SB !important",
                  fontWeight: "bold",
                  fontSize: "18",
                  color: "black",
                }}
              >
                {otpSent
                  ? page === "signup"
                    ? "Sign Up"
                    : "Sign In"
                  : "Get OTP"}

                <IonIcon slot="end" color="black" icon={arrowForward} />
              </IonButton>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2vh",
              marginRight: "10vw",
              width: "100%",
            }}
          >
            <div style={{ width: "65%", height: "10%" }}></div>
          </div>

          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={msg}
            icon={informationCircle}
            translucent={true}
            mode="ios"
            duration={2000}
            position="top"
            buttons={[
              {
                text: "Hide",
                role: "cancel",
                handler: () => setShowToast1(false),
              },
            ]}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Onboard;
