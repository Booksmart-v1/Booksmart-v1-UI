import {
  IonChip,
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonToast,
  IonButton,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
  IonHeader,
  IonText,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./search.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import axios from "axios";
import { APIURL } from "../constants";
import { get, post } from "../common/api";

const Search: React.FC = () => {
  SwiperCore.use([Autoplay]);
  const [info, setInfo] = useState([]);
  const [wishListData, setWishListData] = useState<any>([]);
  const getWishlistDetails = () => {
    var url = APIURL + "v2/getWishlist";
    var userId = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
    }
    get(url + `?userId=${userId}`)
      .then((resp) => {
        if (resp !== null && resp.success === true) {
          var data = resp.data;
          let wishListIds = Array.from(new Set(data[0].bookIds));
          getWishListCardDetails(wishListIds);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCardDetails(60);
    getWishlistDetails();
  }, []);
  const defaultImage = "https://via.placeholder.com/200/1200";
  const getWishListCardDetails = (wishListIds: any) => {
    const url = APIURL + "v2/getBooks";
    get(url)
      .then((resp) => {
        if (resp !== null && resp.success === true) {
          var data = resp.data;
          var arr: any = [];
          for (let i = 0; i < wishListIds.length; i++) {
            data.filter((item: any) => {
              if (item._id === wishListIds[i]) {
                arr.push(item);
              }
            });
          }
          setWishListData(arr);
          setInfo(data);
          console.log(arr);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(wishListData);
  // console.log(info);
  const [showAddToast, setShowAddToast] = useState(false);
  const [showAddToast1, setShowAddToast1] = useState(false);

  const addToWishlist = (bookId: string) => {
    var url = APIURL + "v2/addBookToWishlist";
    var userId = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
    }
    post(url, {
        userId: userId,
        bookId: bookId,
      })
      .then((resp) => {
        console.log(resp);
        if (resp !== null && resp.success === true) {
          let data = resp.data;
          console.log(data);
          setShowAddToast(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // Search for wishlist book
  const [searchBook, setSearchBook] = useState("");
  const handleSearchBook = (e: any) => {
    const searchText = e.detail.value;
    setSearchBook(searchText);
    if (searchText !== "") {
      const xyz = info.filter((item: any) => {
        if (item.bookName.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      });
      setWishListData(xyz);
    } else {
      // setWishListData(info);
      getWishlistDetails();
      // getWishListCardDetails(wishListIds);
    }
  };
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getWishlistDetails();
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  const [bookAdAvailable, setBookAdAvailable] = useState<any>();
  // console.log(wishListData.map((value: any) => bookAdAvailable.includes(value._id))); // to check whether bookads are in common with database
  const getCardDetails = (lim: Number) => {
    const url = APIURL + "v2/getBookAds";
    var userId = "1233";
    var username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
      // setCurrUser({ ...currUser, userId: userId, username: username });
    }
    get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        if (resp !== null && resp.success === true) {
          var data = resp.data;
          setBookAdAvailable(
            data.map((item: any) => {
              return item.bookId;
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <IonPage>
      <IonContent>
        {/* <IonHeader>
          <IonText
            style={{
              fontFamily: "Lucida Handwriting",
              fontSize: "30px",
              fontStyle: "bold",
              color: "white",
            }}
          >
            BooksMart{" "}
          </IonText>
        </IonHeader> */}
        <div className="swiper-area">
          <div className="searchHead">
            <IonSearchbar
              placeholder="Add your favourite books"
              style={{
                "--background": "white",
                "--placeholder-color": "black",
                width: "90%",
                fontFamily: "Montserrat-sb",
              }}
              value={searchBook}
              onIonChange={(e) => {
                handleSearchBook(e);
              }}
            ></IonSearchbar>

            <IonToast
              isOpen={showAddToast1}
              onDidDismiss={() => setShowAddToast1(false)}
              message="Pull to Refresh"
              duration={200}
              translucent={true}
              mode="ios"
              buttons={[
                {
                  text: "Hide",
                  role: "cancel",
                  handler: () => setShowAddToast1(false),
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
              <p> Refreshing Your Favourite Content!✌️</p>
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonToast
              // style={{ fontFamily: "Montserrat-sb" }}
              isOpen={showAddToast}
              onDidDismiss={() => setShowAddToast(false)}
              message="Added book to wishlist!"
              duration={1500}
            />
            <IonIcon
              icon={addCircle}
              color="red"
              size="large"
              slot="end"
              onClick={() => {
                addToWishlist(wishListData[0]._id);
              }}
            ></IonIcon>
          </div>

          <Swiper
            style={{ height: "12vh" }}
            modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide style={{ padding: "0 15px" }}>
              <p
                style={{
                  textAlign: "left",
                  fontFamily: "Montserrat-sb",
                  fontSize: "26px",
                }}
              ></p>
            </SwiperSlide>
            {/* <SwiperSlide style={{ padding: "0 15px" }}>
            <p
              style={{
                textAlign: "left",
                fontFamily: "Montserrat-sb",
                fontSize: "26px",
              }}
            >
              Horror & Thriller
            </p>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p
              style={{
                textAlign: "left",
                fontFamily: "Montserrat-sb",
                fontSize: "26px",
              }}
            >
              Love
            </p>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p
              style={{
                textAlign: "left",
                fontFamily: "Montserrat-sb",
                fontSize: "26px",
              }}
            >
              Health
            </p>
          </SwiperSlide> */}
          </Swiper>
        </div>
        <IonContent className="wishlist-area">
          <div className="wishlist-books">
            {wishListData.map((item: any, idx: number) => {
              return (
                <div className="wishlist-card" key={idx}>
                  <div className="wishlist-img">
                    <img
                      src={defaultImage}
                      alt="wishlist-book"
                      style={{
                        width: "75px",
                        height: "100px",
                        borderRadius: "10%",
                      }}
                    />
                  </div>
                  <div className="wishlist-content">
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--bs-sText)",
                        fontFamily: "Montserrat-b",
                      }}
                    >
                      {item.bookName}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "10px 0",
                        fontFamily: "Montserrat-sb",
                        color: "var(--bs-pText)",
                      }}
                    >
                      {item.bookAuthor}
                    </p>
                    {item.tags.map((tag: string, index: number) => (
                      <IonChip
                        color="warning"
                        key={index}
                        style={{
                          color: "black",
                          border: "1px solid black",
                          background: "var(--bs-pBg)",
                        }}
                      >
                        <IonLabel
                          style={{
                            fontFamily: "Montserrat-sb",
                            fontSize: "11px",
                            textTransform: "capitalize",
                          }}
                        >
                          {tag.toLowerCase()}
                        </IonLabel>
                      </IonChip>
                    ))}
                    {bookAdAvailable.includes(item._id) ? (
                      <>
                        <IonButtons
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IonButton
                            className="wishlist-buybtn"
                            style={{ fontSize: "12px" }}
                          >
                            Buy Now
                          </IonButton>
                        </IonButtons>
                      </>
                    ) : (
                      <>
                        <IonButtons
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <IonButton
                            className="wishlist-buybtn"
                            style={{ fontSize: "12px" }}
                          >
                            Unavailable
                          </IonButton>
                        </IonButtons>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Search;
