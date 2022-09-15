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
  IonSpinner,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  useIonAlert,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";

// import { addOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./wishlist.css";
import rectangle from "../images/Rectangle.png";
import book from "../images/book.jpg";
import logo from "../images/history.jpg";
import "./sell.css";
import React, { useEffect, useState } from "react";
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
  },
];
const tempbook = {
  bookId: null,
  bookName: "Book",
  bookAuthor: "Roald Dahl",
  bookDescription: "This is a book",
  tags: ["Mystery", "Fiction", "Romance"],
};
const Sell: React.FC = () => {
  const [info, setInfo] = useState(SellCardDettails);

  const [genres, setGenres] = React.useState([
    { key: 0, label: "Health" },
    { key: 1, label: "Love" },
    { key: 2, label: "Horror" },
    { key: 3, label: "Fiction" },
  ]);
  const [segment, setSegment] = React.useState("activeTrades");
  const [loading, setLoading] = React.useState(false);
  const [screen, setScreen] = React.useState("details");
  const [name, setName] = React.useState("");
  const [descr, setDescr] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [isbn, setISBN] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [book, setBook] = React.useState(tempbook);
  const [showToast1, setShowToast1] = useState(false);

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [showModal, setShowModal] = useState(false);

  const { photos, takePhoto } = usePhotoGallery();

  const history = useHistory();
  const toaster1 = () => {
    setShowToast1(true);
  };
  const handleClick = () => {
    setScreen("upload");
  };
  const handleClick1 = () => {
    setScreen("choose");
  };

  const getBookDetails = () => {
    setLoading(true);
    const url = APIURL + "v2/getBook";

    axios
      .get(url + `?ISBN=${isbn}`)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          setName(resp.data.data.bookName);
          setDescr(resp.data.data.bookDescription);
          setBook(resp.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeScreen = () => {
    console.log(screen);
    if (screen === "details") setScreen("upload");
    else {
      // get Book details from book name
      // const tempbook = ;
      let id = book.bookId;
      console.log(id);
      if (id === null) {
        const url = APIURL + "v2/addBooks";
        axios
          .post(url, {
            bookName: book.bookName,
            bookAuthor: book.bookAuthor,
            bookDescription: book.bookDescription,
            ISBN: isbn,
            tags: book.tags,
          })
          .then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
              id = resp.data.data.bookId;
              console.log(id);
              const url = APIURL + "v2/addBookAds";
              let userId = "1233";
              let username = "Aagam";
              const a = localStorage.getItem("user");
              if (a) {
                userId = JSON.parse(a).id;
                username = JSON.parse(a).name;
              }
              axios
                .post(url, {
                  bookId: id,
                  sellerId: userId,
                  sellerName: username,
                  bookName: book.bookName,
                  bookPrice: price,
                  bookAuthor: book.bookAuthor,
                  bookCondition: condition,
                  tags: book.tags,
                  sellerAddress: address,
                  sellerPincode: pincode,
                  bookDescription: descr,
                  sold: false,
                })
                .then((resp) => {
                  console.log(resp);
                  if (resp.data.success) {
                    setShowModal(false);
                    setScreen("details");
                    toaster1();
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
        setBook(tempbook);
        setName("");
        setDescr("");
        setPrice("");
        setCondition("");
        setAddress("");
        setPincode("");
        return;
      }

      const url = APIURL + "v2/addBookAds";
      let userId = "1233";
      let username = "Aagam";
      const a = localStorage.getItem("user");
      if (a) {
        userId = JSON.parse(a).id;
        username = JSON.parse(a).name;
      }
      console.log(id);

      axios
        .post(url, {
          bookId: id,
          sellerId: userId,
          sellerName: username,
          bookName: book.bookName,
          bookPrice: price,
          bookAuthor: book.bookAuthor,
          bookCondition: condition,
          tags: book.tags,
          sellerAddress: address,
          sellerPincode: pincode,
          bookDescription: descr,
          sold: false,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.data.success) {
            setShowModal(false);
            setScreen("details");
            toaster1();
          }
        })
        .catch((e) => {
          console.log(e);
        });
      setBook(tempbook);
      setName("");
      setDescr("");
      setPrice("");
      setCondition("");
      setAddress("");
      setPincode("");
    }
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getTradeCardDetails(60);
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  // Trades
  // const [tradeInfo, setTradeInfo] = useState<any[]>([]);
  const [activeTrades, setActiveTrades] = useState<any[]>([]);
  const [pastTrades, setPastTrades] = useState<any[]>([]);
  const defaultImage = "https://via.placeholder.com/200/1200";
  const getTradeCardDetails = (lim: Number) => {
    const url = APIURL + "v2/getMyBookAds";
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
        if (resp.status === 200) {
          // console.log(resp.data.data);
          let data = resp.data.data.selling;
          for (const element of data) {
            element.bookImageUrl = element.bookImageUrl
              ? element.bookImageUrl
              : defaultImage;
          }
          setActiveTrades(
            data.filter((item: any) => {
              if (item.sold === false) {
                return item;
              }
            })
          );
          setPastTrades(
            data.filter((item: any) => {
              if (item.sold === true) {
                return item;
              }
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTradeCardDetails(60);
  }, []);

  // Sort by Price Filter
  const [presentAlert] = useIonAlert();
  const [sortByPrice, setSortByPrice] = useState(false);
  return (
    <>
      <IonPage>
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
              <IonButton style={{ fontFamily: "Montserrat-sb" }}
              >
              </IonButton>
            </IonButtons>
            <IonIcon
              slot="end"
              color="primary"
              style={{
                display: "flex",
                margin: "10px",
                fontSize: "28px",
              }}
              icon={funnelOutline}
              onClick={() => {
                presentAlert({
                  header: 'Sort By',
                  buttons: ['OK'],
                  inputs: [
                    {
                      label: 'Newest',
                      type: 'radio',
                      value: 'Newest',
                      checked: !sortByPrice,
                      handler: () => { setSortByPrice(false); }
                    },
                    {
                      label: 'Price',
                      type: 'radio',
                      value: 'Price',
                      checked: sortByPrice,
                      handler: () => { setSortByPrice(true); }
                    }
                  ],
                })
              }
              }
            ></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
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
            <p> Fetching your recent Trades!✌️</p>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
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
            <div className={sortByPrice ? "trading-area" : "trading-area newest"}>
              {segment === "activeTrades"
                ? (activeTrades.length > 0 ?
                  activeTrades.sort((a, b) => { return a.bookPrice - b.bookPrice }).map((element, idx) => {
                    return (
                      <>
                        <IonCard key={idx} className="trade-card">
                          <div className="trade-card-img">
                            <img
                              alt="Book"
                              className="pic"
                              src={element.bookImageUrl}
                            />
                          </div>
                          <div className="trade-card-content">
                            <IonCardTitle
                              style={{
                                fontSize: "12px",
                                fontFamily: "Montserrat-b",
                              }}
                            >
                              {element.bookName}
                            </IonCardTitle>
                            <IonCardSubtitle
                              style={{
                                fontSize: "10px",
                                fontFamily: "Montserrat-sb",
                              }}
                            >
                              {element.bookAuthor}
                            </IonCardSubtitle>
                            <div>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontFamily: "Montserrat-sb",
                                }}
                              >
                                ₹ {element.bookPrice}
                              </p>
                            </div>
                            {/* <div className="trade-card-status">
                            <p style={{ fontSize: "18px", fontFamily: "Montserrat-sb" }}>Status: {element.sold ? <span style={{ color: "var(--ion-color-success)" }}>SOLD</span> : <span style={{ color: "var(--ion-color-danger)" }}>UNSOLD</span>}</p>
                          </div> */}
                          </div>
                          <div className="trade-tick">
                            <img
                              src="https://thumbs.dreamstime.com/b/unsold-red-rubber-stamp-over-white-background-88004947.jpg"
                              alt=""
                            />
                          </div>
                        </IonCard>
                      </>
                    );
                  }) : (
                    <div className="noBooks">
                      <img src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif" alt="Sorry" width={"100px"} />
                      <p>Currently there are no books available with this name.</p>
                    </div>))
                : (pastTrades.length > 0 ?
                  (pastTrades.sort((a, b) => { return a.bookPrice - b.bookPrice }).map((element, idx) => {
                    return (
                      <>
                        <IonCard key={idx} className="trade-card">
                          <div className="trade-card-img">
                            <img
                              alt="Book"
                              className="pic"
                              src={element.bookImageUrl}
                            />
                          </div>
                          <div className="trade-card-content">
                            <IonCardTitle
                              style={{
                                fontSize: "12px",
                                fontFamily: "Montserrat-b",
                              }}
                            >
                              {element.bookName}
                            </IonCardTitle>
                            <IonCardSubtitle
                              style={{
                                fontSize: "10px",
                                fontFamily: "Montserrat-sb",
                              }}
                            >
                              {element.bookAuthor}
                            </IonCardSubtitle>
                            <div>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontFamily: "Montserrat-SB",
                                }}
                              >
                                Price: ₹ {element.bookPrice}
                              </p>
                            </div>
                            <div className="trade-card-status">
                              <p
                                style={{
                                  fontSize: "20px",
                                  fontFamily: "Montserrat-sb",
                                }}
                              >
                                Status:{" "}
                                {element.sold ? (
                                  <span
                                    style={{
                                      color: "var(--ion-color-success)",
                                    }}
                                  >
                                    SOLD
                                  </span>
                                ) : (
                                  <span
                                    style={{ color: "var(--ion-color-danger)" }}
                                  >
                                    UNSOLD
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="trade-tick">
                            <img
                              src="https://thumbs.dreamstime.com/b/unsold-red-rubber-stamp-over-white-background-88004947.jpg"
                              alt=""
                            />
                          </div>
                        </IonCard>
                      </>
                    )
                  })) : (
                    <div className="noBooks">
                      <img src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif" alt="Sorry" width={"100px"} />
                      <p>Currently there are no books available with this name.</p>
                    </div>
                  ))
              }
            </div>

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
                      <div className="number1">
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
                            placeholder="Enter ISBN"
                            // disabled={true}
                            value={isbn}
                            onIonChange={(e: any) => {
                              setISBN(e.target.value);
                            }}
                          ></IonInput>
                        </IonItem>
                        <IonButton
                          disabled={
                            isbn.length !== 10 && isbn.length !== 13 && loading
                          }
                          onClick={() => {
                            getBookDetails();
                          }}
                        >
                          {loading ? <IonSpinner name="dots" /> : "Get"}
                        </IonButton>
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
                            type="text"
                            disabled={true}
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
                            disabled={true}
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
