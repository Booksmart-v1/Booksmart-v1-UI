import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCardHeader,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonAvatar,
  IonChip,
  IonLabel,
  IonListHeader,
  IonModal,
  useIonModal,
  IonButton,
  useIonToast,
  IonFooter,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonButtons,
  IonIcon,
  IonToggle,
  IonItemDivider,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import ExploreContainer from "../components/ExploreContainer";
import "./homePage.css";
import logo from "../images/Booksmart.png";
import star from "../images/star.png";
import { useState, useEffect } from "react";
import {
  headset,
  informationCircle,
  starHalfSharp,
  toggle,
} from "ionicons/icons";
import Search from "./Search";
import { APIURL } from "../constants";
import axios from "axios";

const defaultImage = "https://via.placeholder.com/200/1200";
const cardDetails = [
  {
    bookImageUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    // avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookAuthor: "Author One",
    bookName: "The Great Gatsby",
    bookDescription:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    tags: ["Love"],
    bookPrice: "200",
    sellerName: "Taarush Bhatia",
    sellerId: "1",
    sellerAddress: "Pune",
    sellerPincode: "411037",
    sold: false,
    interestedBuyers: ["1", "2", "3"],
  },
  {
    bookImageUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    // avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookAuthor: "Author One",
    bookName: "The Great Gatsby",
    bookDescription:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    tags: ["Love"],
    bookPrice: "200",
    sellerName: "Taarush Bhatia",
    sellerId: "1",
    sellerAddress: "Pune",
    sellerPincode: "411037",
    sold: false,
    interestedBuyers: ["1", "2", "3"],
  },
  {
    bookImageUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    // avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookAuthor: "Author One",
    bookName: "The Great Gatsby",
    bookDescription:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    tags: ["Love"],
    bookPrice: "200",
    sellerName: "Taarush Bhatia",
    sellerId: "1",
    sellerAddress: "Pune",
    sellerPincode: "411037",
    sold: false,
    interestedBuyers: ["1", "2", "3"],
  },
  {
    bookImageUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    // avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookAuthor: "Author One",
    bookName: "The Great Gatsby",
    bookDescription:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    tags: ["Love"],
    bookPrice: "200",
    sellerName: "Taarush Bhatia",
    sellerId: "1",
    sellerAddress: "Pune",
    sellerPincode: "411037",
    sold: false,
    interestedBuyers: ["1", "2", "3"],
  },
  {
    bookImageUrl: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    // avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookAuthor: "Author One",
    bookName: "The Great Gatsby",
    bookDescription:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    tags: ["Love"],
    bookPrice: "200",
    sellerName: "Taarush Bhatia",
    sellerId: "1",

    sellerAddress: "Pune",
    sellerPincode: "411037",
    sold: false,
    interestedBuyers: ["1", "2", "3"],
  },
];

// const tempSellerDetails = {
//   sellerName: "Taarush Bhatia",
//   sellerId: "1",
//   sellerAddress: "Pune",
//   sellerPincode: "411037",
//   interestedBuyers: ["1", "2", "3"],
//   bookPrice: "200",
// };

const Tab1: React.FC = () => {
  const [info, setInfo] = useState(cardDetails);
  const [sellerDeets, setSellerDeets] = useState(cardDetails[0]);
  const [interest, setInterest] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [msg, setMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const getCardDetails = (lim: Number) => {
    const url = APIURL + "v2/getBookAds";
    let userId = "1233";
    let username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          for (const element of data) {
            element.bookImageUrl = element.bookImageUrl
              ? element.bookImageUrl
              : defaultImage;
          }
          setInfo(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getCardDetails(60);
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  useEffect(() => {
    getCardDetails(60);
  }, []);

  return (
    <IonPage className="backg">
      {/* <IonHeader className='header'></IonHeader> */}
      <IonContent
        onLoad={() => setShowToast1(true)}
        fullscreen
        className="boola"
      >
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Pull to Refresh"
          duration={200}
          translucent={true}
          mode="ios"
          buttons={[
            {
              text: "Hide",
              role: "cancel",
              handler: () => setShowToast1(false),
            },
          ]}
        />

        <IonToast
          isOpen={showToast2}
          onDidDismiss={() => setShowToast2(false)}
          message={msg}
          duration={400}
          translucent={true}
          mode="ios"
          position="top"
          buttons={[
            {
              text: "Hide",
              role: "cancel",
              handler: () => setShowToast2(false),
            },
          ]}
        />
        <IonRefresher
          slot="fixed"
          placeholder="P"
          onIonRefresh={doRefresh}
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
          style={{
            color: "black",
            fontFamily: "Montserrat-SB",
            fontSize: "1.1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Hang on .. <p> Refreshing Your Favourite Content!✌️</p>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader className="header">
          <IonToolbar className="toolbar">
            <br />
            {/* <IonTitle class="text-align-left">BOOKS</IonTitle> */}
            <br />
            <IonSearchbar
              showCancelButton="focus"
              placeholder="Click to Search "
            ></IonSearchbar>
            {/* <IonModal
              isOpen={showModal}
              className="modal"
              swipeToClose={true}
              breakpoints={[0, 0.3, 1]}
              initialBreakpoint={0.5}
              onDidDismiss={() => setShowModal(false)}
            >
              <Search />
              <IonFooter>
                <IonButton
                  onClick={() => setShowModal(false)}
                  style={{
                    marginTop: "360px",
                    width: "90%",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  Close Modal
                </IonButton>
              </IonFooter>
            </IonModal> */}
          </IonToolbar>

          <IonGrid className="chips">
            <span className="chip">
              <IonChip color="warning">
                <IonLabel>Top 200</IonLabel>
              </IonChip>
            </span>
            <span className="chip">
              <IonChip color="warning">
                <IonLabel>Popular</IonLabel>
              </IonChip>
            </span>
            <span className="chip">
              <IonChip color="warning">
                <IonLabel>Most Rated</IonLabel>
              </IonChip>
            </span>
          </IonGrid>
        </IonHeader>

        <IonGrid className="oola">
          <IonModal
            isOpen={showModal}
            swipeToClose={true}
            mode="ios"
            initialBreakpoint={1}
            // breakpoints={[0.8, 1]}
            title="Seller Details"
            keyboardClose={true}
            onDidDismiss={() => setShowModal(false)}
          >
            <IonContent>
              <IonHeader>
                <IonToolbar>
                  <h2
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat-B",
                      color: "var(--bs-pText)",
                      marginLeft: "30px",
                    }}
                  >
                    {sellerDeets.bookName}
                  </h2>
                  <IonButtons slot="end">
                    <IonButton
                      onClick={() => {
                        setShowModal(false);
                      }}
                      slot="end"
                      mode="ios"
                    >
                      Close
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <img
                src={
                  "https://material.angular.io/assets/img/examples/shiba1.jpg"
                }
                style={{ width: "100%", height: "400px", marginBottom: "10px" }}
                alt="book"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    alignSelf: "center",
                    fontSize: 15,
                    fontWeight: "bolder",
                    color: `${true ? "green" : "red"}`,
                    marginBottom: "3px",
                  }}
                >{`${true ? "Negotiable Price!" : "Not Negotiable!"}`}</p>
                <h2
                  style={{
                    alignSelf: "center",
                    fontFamily: "Montserrat-B",
                    color: "var(--bs-pText)",
                    marginLeft: "0px",
                  }}
                >
                  Seller Details
                </h2>
                <IonItemDivider
                  style={{
                    alignSelf: "center",
                    marginRight: "25px",
                  }}
                ></IonItemDivider>
                <br />
                <p
                  style={{
                    fontSize: 19,
                    fontWeight: "bolder",
                    marginBottom: "8px",
                  }}
                >{`${sellerDeets.sellerName}`}</p>

                {/* STATUS OF SELLER FROM SELLER ID */}
                {/* <p
                  style={{
                    fontSize: 15,
                    fontWeight: "lighter",
                    marginBottom: "15px",
                    marginLeft: "15px",
                  }}
                >{`${sellerDeets.info}`}</p> */}
                <p style={{ fontSize: 18, marginBottom: "10px" }}>
                  {`City: `}
                  <b>{sellerDeets.sellerAddress}</b>
                </p>
                <p style={{ fontSize: 18, marginBottom: "10px" }}>
                  {`Price: `}
                  <b>{sellerDeets.bookPrice}</b>
                </p>
                {/* <p
                  style={{
                    fontSize: 15,
                    fontWeight: "lighter",
                    marginBottom: "15px",
                    marginLeft: "15px",
                  }}
                >{`${info}`}</p>
                <p style={{ fontSize: 18, marginBottom: "10px" }}>
                  {`Cost: `}
                  <b>{}</b>
                </p> */}
              </div>
              <IonItemDivider style={{ marginLeft: "130px" }}></IonItemDivider>
              <div style={{ width: "100%", height: "30px" }}></div>
              <IonFooter>
                <IonItem>
                  <IonTitle
                    style={{
                      marginLeft: "-30px",
                      fontSize: "22px",
                      padding: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    Interested?
                    <IonToggle
                      style={{
                        marginLeft: "80px",
                        color: `${interest ? "red" : "green"}`,
                      }}
                      onClick={() => {
                        if (interest) {
                          setInterest(!interest);
                          setMsg("Request Retracted!");
                          setShowToast2(true);
                        } else {
                          setInterest(!interest);
                          setMsg(`Request Sent to ${sellerDeets.sellerName}!`);
                          setShowToast2(true);
                        }
                      }}
                    >
                      {/* {interest ? "Retract Interest " : "I am Interested ! "} */}
                    </IonToggle>
                  </IonTitle>
                </IonItem>
              </IonFooter>
            </IonContent>
          </IonModal>
          {info.map((element, index) => {
            return (
              <>
                <br />
                <IonCard key={index} className="card">
                  <IonGrid
                    onClick={() => {
                      setInterest(false);
                      setSellerDeets(element);
                      setShowModal(true);
                    }}
                  >
                    <IonRow className="row">
                      <IonCol className="img" size="6">
                        <img
                          alt="Book"
                          className="pic"
                          src={element.bookImageUrl}
                        />
                      </IonCol>
                      <IonCol className="ion-no-padding" size="6">
                        <IonItem>
                          <IonGrid>
                            {/* <IonAvatar item-start> <img alt="avatar" src={element.avatar} /> </IonAvatar> */}
                            <IonHeader>
                              <h3 style={{ fontSize: "14px" }}>
                                {element.bookName}
                              </h3>
                            </IonHeader>
                            <p style={{ fontSize: "13px" }}>
                              {element.bookAuthor}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                margin: "5px 0",
                                padding: "5px 0",
                              }}
                            >
                              {element.tags.map((tag, index) => (
                                <IonChip
                                  color="warning"
                                  key={index}
                                  style={{
                                    color: "black",
                                    border: "1px solid black",
                                  }}
                                >
                                  <IonLabel
                                    style={{ fontFamily: "Montserrat-sb" }}
                                  >
                                    {tag}
                                  </IonLabel>
                                </IonChip>
                              ))}

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <h6>{element.rating}</h6>
                                <img alt="avatar" className="ava" src={star} />
                              </div>
                            </div>
                          </IonGrid>
                        </IonItem>
                        <IonCardContent>
                          <p>{element.bookDescription}</p>
                        </IonCardContent>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
