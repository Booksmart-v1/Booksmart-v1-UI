import {
  IonContent,
  IonText,
  IonRow,
  IonCol,
  IonHeader,
  useIonToast,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonIcon,
  IonButtons,
  IonItem,
  IonLabel,
  IonInput,
  IonFooter,
  IonToast,
  IonItemDivider,
} from "@ionic/react";
// import ExploreContainer from '../../components/ExploreContainer';
// import '../Tab3.css';
// import "./welcome.css";
// import logo from "../../images/woman.png";
// import leaf from "../../images/leaf.png";
// import ellipse from "../../images/ellipse.png";
// import SignIn from '../../components/sign-in/SignIn';
// import SignUp from '../../components/sign-up/SignUp';
import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Onboard.css";
import {
  arrowBack,
  arrowBackOutline,
  arrowForward,
  calendarNumber,
  informationCircle,
} from "ionicons/icons";
import OtpInput from "react-otp-input";
import mainLogo from "../../images/logo.png";
import { useHistory } from "react-router-dom";
import { IonSlides, IonSlide } from "@ionic/react";
import { dismiss } from "@ionic/core/dist/types/utils/overlays";
import axios from "axios";
import { APIURL } from "../../constants";
import { Channel } from "stream-chat-react";
import { channelReducer } from "stream-chat-react/dist/components/Channel/channelState";

interface UserDetailPageProps
  extends RouteComponentProps<{
    page: string;
  }> { }

const Onboard: React.FC<UserDetailPageProps> = ({ match }) => {
  const [page, setPage] = useState("signup");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [id, setID] = useState(null);
  // const [present, dismiss] = useIonToast();
  const [showToast1, setShowToast1] = useState(false);
  const [msg, setMsg] = useState("");
  // const [showToast2, setShowToast2] = useState(false);
  const handleChange = (num: string) => setOtp(num);
  const history = useHistory();

  useEffect(() => {
    console.log(match.params.page);
    setPage(match.params.page);
  }, [match.params.page]);

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
            setMsg(res.data.message);
            if (res.status === 200) {
              setOtpSent(true);
              setID(res.data.data.userId);
            }
            setShowToast1(true);
          })
          .catch((e) => {
            setMsg(e.message);
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
            localStorage.setItem("user", JSON.stringify(user));
            if (page === "signup") history.push("/pickinterests");
            else history.push("/homepage");
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
        <IonContent className="md bg ion-no-padding" scrollY={false}>
          <div className="bod">
            <IonButton
              slot="start"
              onClick={() => {
                otpSent ? setOtpSent(!otpSent) : history.goBack();
                setPhone("");
              }}
              style={{
                marginRight: "280px",
                marginTop: "-80px",
                backgroundColor: "transparent",
                background: "transparent",
                border: "none",
                // opacity: "0.7",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <IonIcon slot="icon-only" color="white" icon={arrowBackOutline} />
            </IonButton>
            {otpSent ? (
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
                // containerStyle={{
                //   backgroundColor: 'white',
                //   height: '65px',
                // }}
                inputStyle={{
                  margin: "6px",
                  backgroundColor: "white",
                  height: "57px",
                  width: "9vw",
                  color: "black",
                  fontFamily: "Montserrat-SB !important",
                  fontSize: "16",
                }}
              />
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
                    <div className="number">
                      <p
                        style={{
                          fontFamily: "Montserrat-SB !important",
                          fontWeight: "bold",
                          fontSize: "18",
                        }}
                      >
                        {"Name"}
                      </p>
                      <IonItem style={{ marginTop: "10px" }}>
                        {/* <IonLabel position="floating"> Email</IonLabel> */}
                        <IonInput
                          type="text"
                          value={name}
                          placeholder="Enter name"
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
                      <IonItem style={{ marginTop: "10px" }}>
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
                  marginRight: "-15px",
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
