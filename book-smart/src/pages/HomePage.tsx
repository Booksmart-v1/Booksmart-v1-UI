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
import { useState } from "react";
import {
  headset,
  informationCircle,
  starHalfSharp,
  toggle,
} from "ionicons/icons";
import Search from "./Search";

function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log("Begin async operation");

  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}

const cardDetails = [
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    author: "Author One",
    title: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
    seller: {
      name: "Taarush Bhatia",
      city: "Mumbai",
      info: "This is me. This is where i rant. I hope you like me.",
      negotiable: true,
    },
    interested: false,
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    author: "Author One",
    title: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
    seller: {
      name: "Taarush Bhatia",
      city: "Mumbai",
      info: "This is me. This is where i rant. I hope you like me.",
      negotiable: false,
    },
    interested: true,
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    author: "Author One",
    title: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
    seller: {
      name: "Taarush Bhatia",
      city: "Mumbai",
      info: "This is me. This is where i rant. I hope you like me.",
      negotiable: false,
    },
    interested: false,
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    author: "Author One",
    title: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
    seller: {
      name: "Taarush Bhatia",
      city: "Mumbai",
      info: "This is me. This is where i rant. I hope you like me.",
      negotiable: true,
    },
    interested: false,
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    author: "Author One",
    title: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
    seller: {
      name: "Taarush Bhatia",
      city: "Mumbai",
      info: "This is me. This is where i rant. I hope you like me.",
      negotiable: true,
    },
    interested: false,
  },
];

const Tab1: React.FC = () => {
  const [info, setInfo] = useState(cardDetails);
  // const handleDismiss = () => {
  //   dismiss();
  // };
  // const [present, dismiss] = useIonModal(
  //   onDismiss: handleDismiss,
  // );
  // const [showModal, setShowModal] = useState(false);
  const [sellerDeets, setSellerDeets] = useState(cardDetails[0].seller);
  const [interest, setInterest] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [msg, setMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);

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
                <IonLabel
                // onClick={() => {
                //   <IonModal isOpen={true} swipeToClose={true}>
                //     <IonContent>Modal Content</IonContent>
                //   </IonModal>;
                // }}
                >
                  Top 200
                </IonLabel>
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
                    The Great Gatsby
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
                    color: `${sellerDeets.negotiable ? "green" : "red"}`,
                    marginBottom: "3px",
                  }}
                >{`${
                  sellerDeets.negotiable
                    ? "Negotiable Price!"
                    : "Not Negotiable!"
                }`}</p>
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
                >{`${sellerDeets.name}`}</p>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: "lighter",
                    marginBottom: "15px",
                    marginLeft: "15px",
                  }}
                >{`${sellerDeets.info}`}</p>
                <p style={{ fontSize: 18, marginBottom: "10px" }}>
                  {`City: `}
                  <b>{sellerDeets.city}</b>
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
                          setMsg(`Request Sent to ${sellerDeets.name}!`);
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
                  <IonGrid>
                    <IonRow className="row">
                      <IonCol className="img">
                        <img alt="Book" className="pic" src={element.pic} />
                      </IonCol>
                      <IonCol className="ion-no-padding">
                        <IonItem
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          <IonGrid
                            onClick={() => {
                              setInterest(element.interested);
                              setSellerDeets(element.seller);
                              setShowModal(true);
                            }}
                          >
                            {/* <IonAvatar item-start> <img alt="avatar" src={element.avatar} /> </IonAvatar> */}
                            <IonRow>
                              <h5>
                                <strong>{element.title}</strong>
                              </h5>
                            </IonRow>
                            <IonRow>
                              <p style={{ fontSize: 13 }}>{element.author}</p>
                            </IonRow>
                            <IonRow
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              <IonCol>
                                {" "}
                                <img alt="avatar" className="ava" src={star} />
                              </IonCol>
                              <IonCol style={{ marginLeft: "-2vw" }}>
                                <h6>{element.rating}</h6>
                              </IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonItem>
                        <IonCardContent>
                          <p>{element.descr}</p>
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
