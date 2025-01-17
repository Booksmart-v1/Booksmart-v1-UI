import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonFooter,
  IonRippleEffect,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
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
  IonList,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonPopover,
  IonText,
  IonItemDivider,
  IonChip,
} from "@ionic/react";
import "./wishlist.css";
import "./sell.css";
import React, { useEffect, useRef, useState } from "react";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { add, camera, ellipsisVertical, funnelOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../constants";
import { get, post } from "../common/api";
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
  bookId: "",
  bookName: "Book",
  bookAuthor: "Roald Dahl",
  bookDescription: "This is a book",
  tags: ["Mystery", "Fiction", "Romance"],
};
const Sell: React.FC = () => {
  const [info, setInfo] = useState(SellCardDettails);

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
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
  const [selectedBook, setSelectedBook] = useState<any>({});
  const [msg, setMsg] = useState("");
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const { photos, takePhoto } = usePhotoGallery();
  const [showToast, setShowToast] = useState(false);
  const [isbnToast, setIsbnToast] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const updateAd = (id: number) => {
    const url = APIURL + "v2/updateBookAds";

    post(url, {
        bookAdId: activeTrades[id]._id,
        bookPrice: price,
        bookImageUrl: imageUrl,
        bookCondition: condition,
        sellerAddress: address,
        sellerPincode: pincode,
        bookDescription: descr,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          setShowModal(false);

          setScreen("details");
          toaster1();
        }
        setUpdateFlag(false);
        getTradeCardDetails(60);
      })
      .catch((e) => {
        setUpdateFlag(false);
        getTradeCardDetails(60);
        console.log(e);
      });
  };

  const deleteAd = async (id: string) => {
    const url = APIURL + "v2/deleteAd";

    const resp = await post(url, {
      id: id,
    });
    console.log(resp);
    setMsg(resp.data.message);
    setShowToast(true);
    getTradeCardDetails(60);
  };

  const markAsSold = async (idx: number) => {
    const url = APIURL + "v2/markAsSold";
    console.log(activeTrades[idx]);
    const resp = await post(url, {
      id: activeTrades[idx]._id,
    });
    // const url1 = APIURL + "v2/closedChat";
    // const resp1 = await axios.post(url1, {
    //   chatRoomId: item.roomId,
    //   value: true,
    // });
    // console.log(resp1);
    console.log(resp);
    getTradeCardDetails(60);
  };
  const markAsUnSold = async (idx: number) => {
    const url = APIURL + "v2/markAsUnsold";
    console.log(pastTrades[idx]);
    const resp = await post(url, {
      id: pastTrades[idx]._id,
    });
    console.log(resp);
    getTradeCardDetails(60);
  };

  const history = useHistory();
  const toaster1 = () => {
    setShowToast1(true);
  };

  const getBookDetails = () => {
    console.log(isbn.length);
    if (isbn.length !== 10 && isbn.length !== 13) {
      return;
    }
    setLoading(true);
    const url = APIURL + "v2/getBook";

    get(url + `?ISBN=${isbn}`)
      .then((resp) => {
        console.log(resp);
        if (resp !== null && resp.success === true) {
          console.log(resp);
          setName(resp.data.bookName);
          setDescr(resp.data.bookDescription);
          setBook(resp.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const changeScreen = () => {
    console.log(screen);
    if (screen === "details") setScreen("upload");
    else if (!updateFlag) {
      // get Book details from book name
      // const tempbook = ;
      console.log(book);
      let id = book.bookId;
      console.log(id);
      if (id === null || id === undefined) {
        const url = APIURL + "v2/addBooks";
        console.log(imageUrl);
        post(url, {
            bookName: book.bookName,
            bookAuthor: book.bookAuthor,
            bookDescription: book.bookDescription,
            ISBN: isbn,
            tags: book.tags,
          })
          .then((resp) => {
            console.log(resp);
            if (resp !== null && resp.success === true) {
              id = resp.data.bookId;
              console.log(id);
              const url = APIURL + "v2/addBookAds";
              let userId = "1233";
              let username = "Aagam";
              const a = localStorage.getItem("user");
              if (a) {
                userId = JSON.parse(a).id;
                username = JSON.parse(a).name;
              }
              post(url, {
                  bookId: id,
                  sellerId: userId,
                  sellerName: username,
                  bookName: book.bookName,
                  bookPrice: price,
                  bookAuthor: book.bookAuthor,
                  bookImageUrl: imageUrl,
                  bookCondition: condition,
                  tags: book.tags,
                  sellerAddress: address,
                  sellerPincode: pincode,
                  bookDescription: descr,
                  sold: false,
                })
                .then((resp) => {
                  console.log(resp);
                  if (resp.success) {
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

      console.log(imageUrl);

      post(url, {
          bookId: id,
          sellerId: userId,
          sellerName: username,
          bookName: book.bookName,
          bookPrice: price,
          bookAuthor: book.bookAuthor,
          bookCondition: condition,
          bookImageUrl: imageUrl,
          tags: book.tags,
          sellerAddress: address,
          sellerPincode: pincode,
          bookDescription: descr,
          sold: false,
        })
        .then((resp) => {
          console.log(resp);
          if (resp.success) {
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
      getTradeCardDetails(60);
    } else {
      updateAd(selectedBook);
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
  const modal = useRef<HTMLIonModalElement>(null);

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
    get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        if (resp !== null && resp.success === true) {
          // console.log(resp.data.data);
          let data = resp.data.selling;
          console.log(data);
          for (const element of data) {
            element.bookImageUrl = element.bookImageUrl
              ? element.bookImageUrl
              : defaultImage;
          }
          setActiveTrades(
            data
              .filter((item: any) => {
                if (item.sold === false) {
                  return item;
                }
              })
              .sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt))
          );
          setPastTrades(
            data
              .filter((item: any) => {
                if (item.sold === true) {
                  return item;
                }
              })
              .sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt))
          );
          // setActiveTrades(activeTrades.sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt)));
          // setPastTrades(pastTrades.sort((a: any, b: any) => b.updatedAt.localeCompare(a.updatedAt)));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [imageUrl, setImageUrl] = useState<string | undefined>("");

  useEffect(() => {
    getTradeCardDetails(60);
  }, []);

  // Sort by Filter
  const [presentAlert] = useIonAlert();
  const [showAlert, setShowAlert] = useState(false);
  // const [markAsSold, setMarkAsSold] = useState(false);
  const [sortByType, setSortByType] = useState({ newest: true, price: false });
  const getImage = () => {
    takePhoto().then((obj: any) => {
      console.log(obj);
      // obj = usePhotoGallery();
      // console.log(obj.photos)
      setImageUrl((old) => {
        console.log(obj.imageUrl);
        console.log(old);
        return obj.imageUrl;
      });
    });
  };
  const handleSortBy = (type: string) => {
    if (type === "newest") {
      const sortedArray1 = activeTrades.sort((a: any, b: any) =>
        b.updatedAt.localeCompare(a.updatedAt)
      );
      setActiveTrades(sortedArray1);
      const sortedArray2 = pastTrades.sort((a: any, b: any) =>
        b.updatedAt.localeCompare(a.updatedAt)
      );
      setPastTrades(sortedArray2);
      setSortByType({ newest: true, price: false });
    }
    if (type === "price") {
      const sortedArray1 = activeTrades.sort(
        (a: any, b: any) => a.bookPrice - b.bookPrice
      );
      setActiveTrades(sortedArray1);
      const sortedArray2 = pastTrades.sort(
        (a: any, b: any) => a.bookPrice - b.bookPrice
      );
      setPastTrades(sortedArray2);
      setSortByType({ newest: false, price: true });
    }
  };
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
              <IonButton style={{ fontFamily: "Montserrat-sb" }}></IonButton>
            </IonButtons>
            <IonIcon
              slot="end"
              style={{
                display: "flex",
                marginTop: "10px",
                fontSize: "28px",
              }}
              icon={funnelOutline}
              color="primary"
              onClick={() => {
                presentAlert({
                  header: "Sort By",
                  buttons: ["OK"],
                  inputs: [
                    {
                      label: "Newest",
                      type: "radio",
                      value: "Newest",
                      checked: sortByType.newest,
                      handler: () => {
                        handleSortBy("newest");
                      },
                    },
                    {
                      label: "Price",
                      type: "radio",
                      value: "Price",
                      checked: sortByType.price,
                      handler: () => {
                        handleSortBy("price");
                      },
                    },
                  ],
                });
              }}
            ></IonIcon>
          </IonToolbar>
        </IonHeader>

        {/* <IonToast
          isOpen={isbnToast}
          onDidDismiss={() => setIsbnToast(false)}
          message="Kindly enter valid ISBN"
          duration={4000}
          translucent={true}
          mode="ios"
          position="top"
          buttons={[
            {
              text: "Hide",
              role: "cancel",
              handler: () => setIsbnToast(false),
            },
          ]}
        /> */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={msg}
          duration={4000}
          translucent={true}
          mode="ios"
          position="top"
          buttons={[
            {
              text: "Hide",
              role: "cancel",
              handler: () => setShowToast(false),
            },
          ]}
        />
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
            {/* activeTrades.sort((a, b) => { return a.bookPrice - b.bookPrice }).map((element, idx) */}
            <div className="trading-area">
              {segment === "activeTrades" ? (
                activeTrades.length > 0 ? (
                  activeTrades.map((element, idx) => {
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
                                fontSize: "16px",
                                fontFamily: "Montserrat-b",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Montserrat-b",
                                  color: "gray",
                                }}
                              >
                                {" "}
                                Book Name:
                              </span>{" "}
                              {element.bookName}
                            </IonCardTitle>
                            <div
                              style={{
                                fontSize: "16px",
                                fontFamily: "Montserrat-b",
                                color: "black",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Montserrat-b",
                                  color: "gray",
                                }}
                              >
                                {" "}
                                Author:
                              </span>{" "}
                              {element.bookAuthor}
                            </div>
                            <div>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontFamily: "Montserrat-b",
                                  color: "black",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Montserrat-b",
                                    color: "gray",
                                  }}
                                >
                                  {" "}
                                  Price:
                                </span>{" "}
                                ₹ {element.bookPrice}
                              </p>
                            </div>
                            <div className="trade-card-status">
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Montserrat-sb",
                                }}
                              >
                                Status:{" "}
                                {element.sold ? (
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "var(--ion-color-success)",
                                    }}
                                  >
                                    SOLD
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "var(--ion-color-danger)",
                                    }}
                                  >
                                    UNSOLD
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div>
                            <IonButtons className="popover-ellipse">
                              <IonButton
                                slot="end"
                                // -id="right-end"
                                onClick={() => {
                                  console.log(element);
                                  setSelectedBook(idx);
                                  setShowPopover({
                                    showPopover: true,
                                    event: element,
                                  });
                                }}
                              >
                                <IonIcon
                                  icon={ellipsisVertical}
                                  color="dark"
                                ></IonIcon>
                              </IonButton>
                            </IonButtons>
                            <IonPopover
                              event={popoverState.event}
                              isOpen={popoverState.showPopover}
                              onDidDismiss={() =>
                                setShowPopover({
                                  showPopover: false,
                                  event: undefined,
                                })
                              }
                            >
                              <IonContent className="popover-size">
                                <IonItem
                                  button
                                  onClick={() => {
                                    setUpdateFlag(true);
                                    setISBN(activeTrades[selectedBook].isbn);
                                    setName(
                                      activeTrades[selectedBook].bookName
                                    );
                                    setDescr(
                                      activeTrades[selectedBook].bookDescription
                                    );
                                    setPrice(
                                      activeTrades[selectedBook].bookPrice
                                    );
                                    setCondition(
                                      activeTrades[selectedBook].bookCondition
                                    );
                                    setAddress(
                                      activeTrades[selectedBook].sellerAddress
                                    );
                                    setPincode(
                                      activeTrades[selectedBook].sellerPincode
                                    );
                                    setShowModal(true);
                                  }}
                                >
                                  <IonLabel className="profile-orders">
                                    {" "}
                                    Update BookAd
                                  </IonLabel>
                                </IonItem>
                                <IonItem
                                  button
                                  onClick={() => {
                                    markAsSold(selectedBook);
                                    console.log(idx);
                                    setShowPopover({
                                      showPopover: false,
                                      event: undefined,
                                    });
                                  }}
                                >
                                  <IonLabel className="profile-orders">
                                    {" "}
                                    Delete Ad
                                  </IonLabel>
                                </IonItem>
                              </IonContent>
                            </IonPopover>
                          </div>
                        </IonCard>
                      </>
                    );
                  })
                ) : (
                  <div className="noBooks">
                    <img
                      src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif"
                      alt="Sorry"
                      width={"100px"}
                    />
                    <p>Currently there are no active trades.</p>
                  </div>
                )
              ) : pastTrades.length > 0 ? (
                pastTrades.map((element, idx) => {
                  return (
                    <div className="trading-area">
                      <IonCard
                        key={idx}
                        className="trade-card"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div className="trade-card-img">
                          <img
                            alt="Book"
                            className="pic"
                            src={element.bookImageUrl}
                          />
                        </div>

                        <div
                          className="trade-card-content"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <IonCardTitle
                            style={{
                              fontSize: "16px",
                              fontFamily: "Montserrat-b",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontFamily: "Montserrat-b",
                                color: "gray",
                              }}
                            >
                              {" "}
                              Book Name:
                            </span>{" "}
                            {element.bookName}
                          </IonCardTitle>
                          <div
                            style={{
                              fontSize: "16px",
                              fontFamily: "Montserrat-b",
                              color: "black",
                              marginTop: "20px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontFamily: "Montserrat-b",
                                color: "gray",
                              }}
                            >
                              {" "}
                              Author:
                            </span>{" "}
                            {element.bookAuthor}
                          </div>

                          <div
                            className="trade-card-status"
                            style={{ marginTop: "20px" }}
                          >
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
                                    fontSize: "14px",
                                    color: "var(--ion-color-success)",
                                  }}
                                >
                                  SOLD
                                </span>
                              ) : (
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "var(--ion-color-danger)",
                                  }}
                                >
                                  UNSOLD
                                </span>
                              )}
                            </p>
                          </div>
                          <IonButtons className="PT-ellipse">
                            <IonButton
                              onClick={() => {
                                console.log(element);
                                setSelectedBook(idx);
                                setShowPopover({
                                  showPopover: true,
                                  event: element,
                                });
                              }}
                              slot="end"
                            >
                              <IonIcon
                                icon={ellipsisVertical}
                                color="dark"
                              ></IonIcon>
                            </IonButton>
                          </IonButtons>

                          <IonPopover
                            event={popoverState.event}
                            isOpen={popoverState.showPopover}
                            onDidDismiss={() =>
                              setShowPopover({
                                showPopover: false,
                                event: undefined,
                              })
                            }
                          >
                            <IonContent className="">
                              <IonItem
                                button
                                onClick={() => {
                                  deleteAd(pastTrades[selectedBook]._id);
                                  setShowPopover({
                                    showPopover: false,
                                    event: element,
                                  });
                                }}
                              >
                                <IonLabel className="profile-orders">
                                  {" "}
                                  Delete Ad
                                </IonLabel>
                              </IonItem>
                              <IonItem
                                onClick={() => {
                                  setShowPopover({
                                    showPopover: false,
                                    event: element,
                                  });
                                  setShowModal1(true);
                                }}
                                button
                              >
                                <IonLabel
                                  // expand="block"
                                  className="profile-orders"
                                >
                                  {" "}
                                  View Details{" "}
                                </IonLabel>
                              </IonItem>
                            </IonContent>
                          </IonPopover>
                        </div>
                        <IonModal
                          isOpen={showModal1}
                          swipeToClose={true}
                          mode="ios"
                          // initialBreakpoint={1}
                          // breakpoints={[0.8, 1]}
                          title="View Details"
                          keyboardClose={true}
                          onDidDismiss={() => setShowModal1(false)}
                        >
                          <IonHeader>
                            <IonToolbar style={{ minHeight: "7vh" }}>
                              <h2
                                style={{
                                  textAlign: "center",
                                  fontFamily: "Montserrat-B",
                                  color: "var(--bs-pText)",
                                  fontSize: "20px",
                                  marginLeft: "50px",
                                }}
                              >
                                View Details
                              </h2>
                              <IonButtons slot="end">
                                <IonButton
                                  onClick={() => {
                                    setShowModal1(false);
                                  }}
                                  slot="end"
                                  mode="ios"
                                >
                                  Close
                                </IonButton>
                              </IonButtons>
                            </IonToolbar>
                            <div
                              className="HPModal-img"
                              style={{
                                // borderRadius: "5px",
                                // padding: "15px",
                                backgroundImage: `url(${element.bookImageUrl})`,
                                // backgroundImage: `url(${"https://material.angular.io/assets/img/examples/shiba1.jpg"})`,
                              }}
                            ></div>
                          </IonHeader>

                          <IonContent>
                            <div
                              style={{
                                maxWidth: "90%",
                                maxHeight: "10vh",
                                textAlign: "center",
                                margin: "20px auto",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  fontFamily: "Montserrat-B",
                                  color: "goldenrod",
                                  fontSize: "22px",
                                  marginBottom: "5px",
                                }}
                              >
                                {element.bookName.length < 45
                                  ? element.bookName.toUpperCase()
                                  : element.bookName.substring(0, 45) + "..."}
                              </p>
                              <p
                                style={{
                                  textAlign: "center",

                                  fontFamily: "Montserrat-SB",
                                  color: "var(--bs-pText)",
                                  fontSize: "18px",
                                }}
                              >
                                {element.bookAuthor}
                              </p>
                              <p
                                style={{
                                  fontSize: "18px",
                                  fontFamily: "Montserrat-sb",
                                }}
                              >
                                Status:{" "}
                                {element.sold ? (
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: "var(--ion-color-success)",
                                    }}
                                  >
                                    SOLD
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: "var(--ion-color-danger)",
                                    }}
                                  >
                                    UNSOLD
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="HPModal-content">
                              <p className="HPModal-desc">
                                {/* {sellerDeets.bookDescription.length < 180
                  ? sellerDeets.bookDescription
                  : sellerDeets.bookDescription.substring(0, 180) + "..."} */}
                                {isReadMore
                                  ? element.bookDescription.slice(0, 170)
                                  : element.bookDescription}{" "}
                                <b
                                  onClick={toggleReadMore}
                                  className="read-or-hide"
                                >
                                  {isReadMore ? "...Read More" : " Show Less"}
                                </b>
                              </p>
                              <div className="HPModal-sellerInfo">
                                <p
                                  style={{
                                    fontFamily: "Montserrat-b",
                                    fontSize: "25px",
                                  }}
                                >
                                  Seller Details
                                </p>
                                <IonItemDivider
                                  style={{ marginLeft: "0" }}
                                ></IonItemDivider>
                                <br />
                                <p>
                                  Name:{" "}
                                  <b style={{ color: "goldenrod" }}>
                                    {element.sellerName}
                                  </b>
                                </p>
                                <p style={{ margin: "10px 0" }}>
                                  Locality:{" "}
                                  <b style={{ color: "goldenrod" }}>
                                    {element.sellerAddress}
                                  </b>
                                </p>
                                <p>
                                  Price:{" "}
                                  <b style={{ color: "goldenrod" }}>
                                    ₹ {element.bookPrice}
                                  </b>
                                </p>
                                <p></p>
                              </div>
                            </div>
                          </IonContent>
                        </IonModal>
                        {/* <div className="trade-tick">
                          <img
                            src="https://thumbs.dreamstime.com/b/unsold-red-rubber-stamp-over-white-background-88004947.jpg"
                            alt=""
                          />
                        </div> */}
                      </IonCard>
                    </div>
                  );
                })
              ) : (
                <div className="noBooks">
                  <img
                    src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif"
                    alt="Sorry"
                    width={"100px"}
                  />
                  <p>Currently there are no past trades.</p>
                </div>
              )}
            </div>
            <IonFabList>
              <IonModal
                isOpen={showModal}
                swipeToClose={true}
                onDidDismiss={() => {
                  setUpdateFlag(false);
                  setShowModal(false);
                }}
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
                            setUpdateFlag(false);
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
                        {updateFlag ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <IonItem style={{ marginTop: "10px" }}>
                              {/* <IonLabel position="floating"> Email</IonLabel> */}
                              <IonInput
                                required
                                type="number"
                                placeholder="Enter 10/13 digit ISBN"
                                value={isbn}
                                onIonChange={(e: any) => {
                                  setISBN(e.target.value);
                                }}
                              ></IonInput>
                            </IonItem>
                            <IonButton
                              disabled={
                                updateFlag ||
                                (isbn.length !== 10 && isbn.length !== 13) ||
                                loading
                              }
                              onClick={() => {
                                setIsbnToast(true);
                                getBookDetails();
                              }}
                            >
                              {loading ? <IonSpinner /> : "Get"}
                            </IonButton>
                          </>
                        )}
                      </div>

                      {updateFlag ? (
                        <></>
                      ) : (
                        <a
                          style={{ margin: "25px" }}
                          href="https://books.google.com/"
                        >
                          Get your ISBN
                        </a>
                      )}
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
                            required
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

                        <IonList>
                          <IonItem>
                            <IonSelect
                              placeholder="Book Condition"
                              value={condition}
                              onIonChange={(e: any) => {
                                setCondition(e.target.value);
                              }}
                            >
                              <IonSelectOption value="old">Old</IonSelectOption>
                              <IonSelectOption value="new">New</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </IonList>
                      </div>
                      <div className="number">
                        <p
                          style={{
                            fontFamily: "Montserrat-B !important",
                            fontSize: "18",
                          }}
                        ></p>
                        <IonItem
                          style={{
                            marginTop: "10px",
                            fontFamily: "Montserrat-B !important",
                            fontSize: "18",
                          }}
                        >
                          {/* <IonLabel position="floating">Address</IonLabel> */}
                          <IonInput
                            placeholder="Locality"
                            value={address}
                            // onClick={() =>
                            //   presentAlert({
                            //     header: "Alert",
                            //     message:
                            //       "Please enter your locality correctly as your Ads will be shown accordingly.",
                            //     buttons: ["OK"],
                            //   })
                            // }
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
                            fontSize: "18",
                          }}
                        ></p>
                        <IonItem
                          style={{
                            marginTop: "10px",
                            fontFamily: "Montserrat-SB !important",
                            fontSize: "18",
                          }}
                        >
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
                          ₹ &nbsp;&nbsp;
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
                          disabled={true}
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
                          onClick={() => getImage()}
                        >
                          <IonIcon icon={camera}></IonIcon>
                        </IonFabButton>
                      </IonFab>
                    </>
                  )}
                </IonContent>
                <IonAlert
                  isOpen={showAlert}
                  onDidDismiss={() => setShowAlert(false)}
                  header="Alert"
                  message="Please enter a valid ISBN"
                  buttons={["OK"]}
                />
                <IonFooter>
                  <button
                    onClick={() => {
                      if (updateFlag) {
                        changeScreen();
                      } else if (isbn.length === 10 || isbn.length === 13) {
                        changeScreen();
                      } else {
                        setShowAlert(true);
                      }
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
                position: "floating",
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
