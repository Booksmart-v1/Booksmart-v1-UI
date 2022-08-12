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
  useIonViewWillEnter,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonInput,
  IonFooter,
  IonRippleEffect,
  IonTextarea,
  IonButtons,
  IonButton,
  IonIcon,
  IonBackButton,
  IonPopover,
  IonModal,
  IonText,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonImg,
  IonToast,
  IonFabList,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";

// import { addOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./wishlist.css";
import rectangle from "../images/Rectangle.png";
import book from "../images/book.jpg";
import logo from "../images/history.jpg";
import React, { useState } from "react";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import {
  add,
  settings,
  share,
  person,
  arrowForwardCircle,
  arrowBackCircle,
  arrowUpCircle,
  logoVimeo,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  camera,
  funnelOutline,
  pricetagsSharp,
} from "ionicons/icons";
import {
  addCircleOutline,
  addOutline,
  arrowBackOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { fileURLToPath } from "url";
import axios from "axios";
import { APIURL } from "../constants";
const SellCardDettails = [
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookName: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookName: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
  },
  {
    pic: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    avatar: "https://material.angular.io/assets/img/examples/shiba1.jpg",
    bookName: "The Great Gatsby",
    descr:
      "Lorem ipsum dolor sit amet, consectetuis nostrud exercitation ullamco laboris ",
    rating: "3.8",
    cost: "200",
  }
];
const Sell: React.FC = () => {
  const [info, setInfo] = useState(SellCardDettails);

  const [genres, setGenres] = React.useState([
    { key: 0, label: "Health" },
    { key: 1, label: "Love" },
    { key: 2, label: "Horror" },
    { key: 3, label: "Fiction" },
  ]);
  const [segment, setSegment] = React.useState("activeTrades");
  const [screen, setScreen] = React.useState("details");
  const [name, setName] = React.useState("");
  const [descr, setDescr] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [showToast1, setShowToast1] = useState(false);

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [showModal, setShowModal] = useState(false);

  const { photos, takePhoto } = usePhotoGallery();

  const history = useHistory();

  useIonViewWillEnter(() => {
    console.log("heyy");
  });

  const toaster1 = () => {
    setShowToast1(true);
  };

  const handleClick = () => {
    setScreen("upload");
  };

  const handleClick1 = () => {
    setScreen("choose");
  };

  const changeScreen = () => {
    if (screen === "details") setScreen("upload");
    else {

      // get Book details from book name
      const book = {
        id: "123",
        name: name,
        author: "Roald Dahl",
        tags: ['Mystery', 'Fiction', 'Romance']
      };

      const url = APIURL + "v2/addBookAds";
      let userId = "1233";
      let username = "Aagam";
      const a = localStorage.getItem("user");
      if(a){
        userId = JSON.parse(a).id;
        username = JSON.parse(a).name;
      }
      
      axios.post(url,{
        bookId: book.id,
        sellerId: userId,
        sellerName: username,
        bookName: book.name,
        bookPrice: price,
        bookAuthor: book.author,
        bookCondition: condition,
        tags: book.tags,
        sellerAddress: address,
        sellerPincode: pincode,
        bookDescription: descr,



      }).then((resp)=>{
        console.log(resp);
        if(resp.data.success)
        {
          setShowModal(false);
          setScreen("details");
          toaster1();
        }
      }).catch((e)=>{
        console.log(e);
      });
      
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <IonPage>
        <IonContent className="ion-no-padding">
          {/* {screen === "choose" ? (
            <> */}
          <IonHeader className="sell-header">
            <IonToolbar className="sell-toolbar">
              <IonTitle
                style={{
                  marginTop: "1px",
                  marginBottom: "5px",
                }}
              >
                <h1>Sell</h1>
              </IonTitle>
              <IonButtons>
                <IonButton
                  onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                  }}
                >
                  <IonPopover
                    event={popoverState.event}
                    isOpen={popoverState.showPopover}
                    onDidDismiss={() =>
                      setShowPopover({ showPopover: false, event: undefined })
                    }
                  >
                    <IonItem button onClick={() => {}}>
                      <IonLabel className="profile-orders">
                        Books Purchased
                      </IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {}}>
                      <IonLabel className="profile-purchases">
                        Books Sold
                      </IonLabel>
                    </IonItem>
                  </IonPopover>
                  <IonIcon
                    slot="end"
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      fontSize: "28px",
                    }}
                    icon={funnelOutline}
                  ></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          {/* <IonGrid className="">
                <IonCard className="ola">
                  <IonCardHeader>
                    <IonCardTitle className="title">
                      Choose Genre of Book{" "}
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonGrid> */}
          <div>
            <IonSegment
              onIonChange={(e) => {
                if (e.detail.value) setSegment(e.detail.value);
                console.log("Segment selected", e.detail.value);
              }}
              style={{
                fontFamily: "Montserrat-SB",
                fontSize: "1.1rem",
                color: "var(--bs-pText)",
                // position: "fixed",
                // zIndex: "21",
              }}
              mode="md"
              value={segment}
            >
              <IonSegmentButton value="activeTrades">
                <IonLabel>Active Trades</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="myPurchases">
                <IonLabel>Past Trades</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {segment === "activeTrades" ? (
              <>
                {info.map((element, index) => {
                  return (
                    <IonCard
                      key={index}
                      style={{ marginTop: "15px", margin: "10px" }}
                    >
                      <IonGrid>
                        <IonRow>
                          <IonCol size="5">
                            {photos.map((photo, index) => (
                              <IonCol size="4" key={index}>
                                {/* <IonImg src={photo.webviewPath} /> */}
                                <IonImg src={element.pic} />
                              </IonCol>
                            ))}
                          </IonCol>

                          <IonCol size="7">
                            <IonCardHeader>
                              <IonCardTitle className="title" style={{fontSize: "18px"}}>
                                {element.bookName}
                              </IonCardTitle>
                            </IonCardHeader>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                      <div>
                        <IonText style={{ color: "black" }}>{descr}</IonText>
                      </div>
                    </IonCard>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            <IonFabList>
              <IonModal
                isOpen={showModal}
                swipeToClose={true}
                onDidDismiss={() => setShowModal(false)}
                mode="ios"
                title="Add Book"
                keyboardClose={true}
              >
                <IonContent>
                  <IonHeader>
                    <IonToolbar>
                      <h2
                        style={{
                          textAlign: "center",
                          fontFamily: "Montserrat-B",
                          color: "var(--bs-pText)",
                          marginLeft: "20px",
                        }}
                      >
                        {screen === "details" ? "Add Books" : "Upload Photos"}
                      </h2>
                      <IonButtons slot="end">
                        <IonButton
                          onClick={() => {
                            setShowModal(false);
                            setScreen("details");
                          }}
                          slot="end"
                          mode="ios"
                        >
                          Close
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  {screen === "details" ? (
                    <>
                      <div className="number">
                        <p
                          style={{
                            fontFamily: "Montserrat-SB !important",
                            fontWeight: "bold",
                            fontSize: "18",
                          }}
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            type="text"
                            value={name}
                            placeholder="Enter Book name"
                            onIonChange={(e: any) => {
                              setName(e.target.value);
                            }}
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
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            placeholder="Enter Description"
                            value={descr}
                            onIonChange={(e: any) => {
                              setDescr(e.target.value);
                            }}
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
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            placeholder="Book Condition"
                            value={condition}
                            onIonChange={(e: any) => {
                              setCondition(e.target.value);
                            }}
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
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            placeholder="Address"
                            value={address}
                            onIonChange={(e: any) => {
                              setAddress(e.target.value);
                            }}
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
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            placeholder="Pincode"
                            value={pincode}
                            onIonChange={(e: any) => {
                              setPincode(e.target.value);
                            }}
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
                        ></p>
                        <IonItem style={{ marginTop: "10px" }}>
                          {/* <IonLabel position="floating"> Email</IonLabel> */}
                          <IonInput
                            placeholder="Book Price"
                            value={price}
                            onIonChange={(e: any) => {
                              setPrice(e.target.value);
                            }}
                          ></IonInput>
                        </IonItem>
                      </div>
                    </>
                  ) : screen === "choose" ? (
                    <IonItem style={{ marginTop: "10px" }}>
                      {/* <IonLabel position="floating"> Email</IonLabel> */}
                      <IonInput
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onIonChange={(e: any) => {
                          setName(e.target.value);
                        }}
                      ></IonInput>
                    </IonItem>
                  ) : (
                    <>
                      <IonItem style={{ marginTop: "10px" }}>
                        {/* <IonLabel position="floating"> Email</IonLabel> */}
                        <IonInput
                          type="text"
                          value={name}
                          placeholder="Enter name"
                          onIonChange={(e: any) => {
                            setName(e.target.value);
                          }}
                        ></IonInput>
                      </IonItem>
                      <br />
                      <IonGrid>
                        <IonRow>
                          {photos.map((photo, index) => (
                            <IonCol size="6" key={index}>
                              <IonImg src={photo.webviewPath} />
                            </IonCol>
                          ))}
                        </IonRow>
                      </IonGrid>
                      <IonFab vertical="bottom" horizontal="end">
                        <IonFabButton
                          mode="ios"
                          style={{
                            marginRight: "10px",
                            marginTop: "30px",
                          }}
                          onClick={() => takePhoto()}
                        >
                          <IonIcon icon={camera}></IonIcon>
                        </IonFabButton>
                      </IonFab>
                    </>
                  )}
                </IonContent>

                <IonFooter>
                  <button
                    onClick={() => {
                      changeScreen();
                    }}
                    className="long-cta"
                  >
                    {screen === "details" ? "Next" : "Add Book"}
                  </button>
                  <IonRippleEffect></IonRippleEffect>
                </IonFooter>
              </IonModal>
            </IonFabList>
          </div>
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message="Book Ad Posted Successfully"
            duration={2000}
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
        </IonContent>
        <IonFooter style={{ marginBottom: "30px" }}>
          <IonFab vertical="bottom" horizontal="end" edge>
            <IonFabButton
              onClick={() => setShowModal(true)}
              style={{
                //marginBottom: "40px",
                // marginRight: "10px",
                position: "static",
              }}
            >
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Sell;
