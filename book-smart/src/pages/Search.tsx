import {
  IonCard,
  IonItemDivider,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonModal,
  IonButtons,
  IonToast,
  IonButton,
} from "@ionic/react";
import { chevronForwardOutline, closeCircle, pin, chevronBackOutline, addCircle, search, arrowBack } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import "./search.css";
import catLogo from "../images/logo.png"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import axios from "axios";
import { APIURL } from "../constants";
import moment from "moment";


const Search: React.FC = () => {
  SwiperCore.use([Autoplay])
  // const [chipData, setChipData] = React.useState([
  //   { key: 0, label: "Health", hide: false },
  //   { key: 1, label: "Love", hide: false },
  //   { key: 2, label: "Horror", hide: false },
  //   { key: 3, label: "Fiction", hide: false },
  // ]);
  // const slideOpts = {
  //   initialSlide: 1.2,
  //   speed: 400,
  // };
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const [screen, setScreen] = React.useState("choose");
  // const [refresh, setRefresh] = React.useState(false);

  // const [showSearchModal, setShowSearchModal] = useState(false);

  // const hideRecent = (i: number) => {
  //   let chips = chipData;
  //   chips[i].hide = true;
  //   console.log("Removed:", chips[i]);
  //   setChipData(chips);
  //   setRefresh(!refresh);
  // };

  // // Trending Books Modal
  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [showAddBookToast, setShowAddBookToast] = useState(false);

  // function handleCategoryChange(e: any) {
  //   setSelectedCategory(e.target.value);
  // }
  // var defaultBooks = [
  //   { name: "The Alchemist", category: "Fiction", price: 99, booksCount: 0 },
  //   { name: "Dracula", category: "Horror", price: 149, booksCount: 0 },
  //   { name: "The Proposal", category: "Love", price: 199, booksCount: 0 },
  //   { name: "Atomic Habits", category: "Health", price: 49, booksCount: 0 },
  // ]

  // var categoryValues = [
  //   { value: "All" },
  //   { value: "Horror" },
  //   { value: "Fiction" },
  //   { value: "Love" },
  //   { value: "Health" },
  // ]

  // if (selectedCategory === "" || selectedCategory === "All") { var filteredList = defaultBooks }
  // else { filteredList = defaultBooks.filter((item) => item.category === selectedCategory); }

  // return (
  // <IonPage>
  //   <IonHeader style={{ width: "100%", height: "11vh" }}>
  //     <IonToolbar style={{ width: "100%" }}>
  //       <IonTitle
  //         style={{
  //           color: "var(--bs-pText)",
  //           textAlign: "center",
  //           fontSize: "20px",
  //           fontFamily: "Montserrat-B",
  //         }}
  //       >
  //         SEARCH
  //       </IonTitle>
  //     </IonToolbar>
  //     <IonSearchbar
  //       style={{ color: "var(--bs-sBg)" }}
  //       showCancelButton="focus"
  //       placeholder="Title, author or ISBN"
  //       onClick={() => setScreen("search")}
  //     ></IonSearchbar>
  //   </IonHeader>
  //   <IonContent style={{ minHeight: "80vh" }}>
  //     <IonRow>
  //       <IonCol size="8">
  //         <p className="text-align-left recent">Recent</p>
  //         <IonItemDivider></IonItemDivider>
  //       </IonCol>
  //       <IonCol size="4">
  //         <p
  //           className="text-align-right"
  //           style={{
  //             marginLeft: "30px",
  //             marginTop: "10px",
  //             color: "grey",
  //             fontSize: "16px",
  //           }}
  //           onClick={() => {
  //             setChipData((chips) =>
  //               chips.map((chip) => {
  //                 chip.hide = true;
  //                 return chip;
  //               })
  //             );
  //           }}
  //         >
  //           Clear All
  //         </p>
  //       </IonCol>
  //     </IonRow>
  //     <div className="searched-chips">
  //       {chipData.map((chip, i) =>
  //         chip.hide ? (
  //           <></>
  //         ) : (
  //           <IonChip
  //             className="searched-items"
  //             key={i}
  //             outline
  //             color="primary"
  //           >
  //             <IonIcon icon={pin} />
  //             <IonLabel style={{ padding: "6px" }}>{chip.label}</IonLabel>
  //             <IonIcon
  //               style={{ height: "20px" }}
  //               onClick={() => hideRecent(i)}
  //               icon={closeCircle}
  //             />
  //           </IonChip>
  //         )
  //       )}
  //     </div>
  //     <IonRow style={{ marginTop: "20px" }}>
  //       <IonCol size="8">
  //         <p className="text-align-left recent">Trending Books</p>
  //         <IonItemDivider></IonItemDivider>
  //       </IonCol>
  //       <IonCol size="4">
  //         <IonRow>
  //           <button
  //             className="text-align-right"
  //             style={{
  //               marginLeft: "20px",
  //               marginTop: "10px",
  //               color: "#002D62",
  //               fontFamily: "Montserrat-SB",
  //               fontSize: "16px",
  //               backgroundColor: "transparent"
  //             }}
  //             onClick={() => {
  //               setShowSearchModal(true);
  //             }}
  //           >
  //             View All
  //           </button>
  //           <span style={{ marginTop: "13px" }}>
  //             <IonIcon
  //               style={{ backgroundColor: "lightgrey", borderRadius: "15px" }}
  //               icon={chevronForwardOutline}
  //             ></IonIcon>
  //           </span>
  //         </IonRow>
  //       </IonCol>
  //     </IonRow>


  //     {/* View All Modal */}
  //     <IonModal isOpen={showSearchModal}>
  //       <IonHeader>
  //         <IonToolbar style={{ padding: "10px" }}>
  //           <IonTitle>
  //             <h2 style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "20px" }}>Trending Books</h2>
  //           </IonTitle>
  //           <IonButtons slot="start">
  //             <IonIcon style={{ backgroundColor: "light gray", borderRadius: "15px", marginLeft: "10px", fontSize: "20px" }} icon={chevronBackOutline} onClick={() => setShowSearchModal(false)}></IonIcon>
  //           </IonButtons>
  //           <IonButtons slot="end">
  //             <IonIcon icon={search} style={{ fontSize: "20px" }} />
  //           </IonButtons>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent>
  //         <div className='search-area'>
  //           <div className='category-area'>
  //             {categoryValues.map((item) =>
  //               <div style={{ textAlign: "center" }}>
  //                 <button className={selectedCategory === item.value ? 'category-btn cat-focus' : 'category-btn'} onClick={(e) => handleCategoryChange(e)} value={item.value} style={{ backgroundImage: `url(${catLogo})` }}></button>
  //                 <p>{item.value}</p>
  //               </div>)}
  //           </div>
  //           <div className='trending-area'>
  //             <IonToast
  //               isOpen={showAddBookToast}
  //               onDidDismiss={() => setShowAddBookToast(false)}
  //               message="Book added to cart."
  //               duration={200}
  //               position="top"
  //             />
  //             {filteredList.map((item, index) =>
  //               <IonCard key={index} className="trend-card">
  //                 <h5 style={{ fontFamily: "Montserrat-B", fontSize: "15px", margin: "5px 0" }}>{item.name}</h5>
  //                 <img
  //                   alt="ex"
  //                   src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
  //                 ></img>
  //                 <p style={{ fontFamily: "Montserrat-SB", fontSize: "14px" }}>{item.category}</p>
  //                 <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", fontSize: "20px", fontFamily: "Monserrat-SB" }}>
  //                   <p>₹ {item.price}</p>
  //                   <IonIcon icon={addCircle} onClick={() => { setShowAddBookToast(true) }} />
  //                 </div>
  //               </IonCard>
  //             )}
  //           </div>
  //         </div>
  //       </IonContent>
  //     </IonModal>


  //     <div className="cards">
  //       <IonSlides pager={true} options={slideOpts}>
  //         <IonSlide>
  //           <IonRow>
  //             <IonCol size="6">
  //               <IonCard className="search-card">
  //                 <img
  //                   style={{
  //                     height: "200px",
  //                     width: "80%",
  //                     borderRadius: "10px",
  //                   }}
  //                   alt="ex"
  //                   src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
  //                 ></img>
  //               </IonCard>
  //             </IonCol>
  //             <IonCol size="6">
  //               <IonCard className="search-card">
  //                 <img
  //                   style={{
  //                     height: "200px",
  //                     width: "80%",
  //                     borderRadius: "10px",
  //                   }}
  //                   alt="ex"
  //                   src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
  //                 ></img>
  //               </IonCard>
  //             </IonCol>
  //             <IonCol size="6">
  //               <IonCard className="search-card">
  //                 <img
  //                   style={{
  //                     height: "200px",
  //                     width: "80%",
  //                     borderRadius: "10px",
  //                   }}
  //                   alt="ex"
  //                   src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
  //                 ></img>
  //               </IonCard>
  //             </IonCol>
  //             <IonCol size="6">
  //               <IonCard className="search-card">
  //                 <img
  //                   style={{
  //                     height: "200px",
  //                     width: "80%",
  //                     borderRadius: "10px",
  //                   }}
  //                   alt="ex"
  //                   src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
  //                 ></img>
  //               </IonCard>
  //             </IonCol>
  //           </IonRow>
  //           <br />
  //           <br />
  /*{ <IonRow>
              <IonCol size="6">
                <IonCard className="search-card">
                  <img
                    style={{ height: "200px", borderRadius: "10px" }}
                    src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
                  ></img>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard className="search-card">
                  <img
                    style={{ height: "200px", borderRadius: "10px" }}
                    src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
                  ></img>
                </IonCard>
              </IonCol>
            </IonRow> }*/
  /*{ </IonSlide>
  <IonSlide>
    <IonRow>
      <IonCol size="6">
        <IonCard className="search-card">
          <img
            style={{
              height: "200px",
              width: "80%",
              borderRadius: "10px",
            }}
            alt="ex"
            src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
          ></img>
        </IonCard>
      </IonCol>
      <IonCol size="6">
        <IonCard className="search-card">
          <img
            style={{
              height: "200px",
              width: "80%",
              borderRadius: "10px",
            }}
            alt="ex"
            src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
          ></img>
        </IonCard>
      </IonCol>
      <IonCol size="6">
        <IonCard className="search-card">
          <img
            style={{
              height: "200px",
              width: "80%",
              borderRadius: "10px",
            }}
            alt="ex"
            src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
          ></img>
        </IonCard>
      </IonCol>
      <IonCol size="6">
        <IonCard className="search-card">
          <img
            style={{
              height: "200px",
              width: "80%",
              borderRadius: "10px",
            }}
            alt="ex"
            src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
          ></img>
        </IonCard>
      </IonCol>
    </IonRow>
  </IonSlide>
</IonSlides>
</div>
</IonContent>
</IonPage > }*/
  const [info, setInfo] = useState([]);
  const [wishListData, setWishListData] = useState<any>([]);
  const getWishlistDetails = () => {
    var url = APIURL + "v2/getWishlist";
    var userId = "";
    var username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .get(url + `?userId=${userId}`)
      .then((resp) => {
        if (resp.status === 200) {
          var data = resp.data.data;
          let wishListIds = Array.from(new Set(data[0].bookIds))
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
    axios
      .get(url)
      .then((resp) => {
        if (resp.status === 200) {
          var data = resp.data.data;
          var arr: any = []
          for (let i = 0; i < wishListIds.length; i++) {
            data.filter((item: any) => {
              if (item._id === wishListIds[i]) {
                arr.push(item);
              }
            })
          }
          setWishListData(arr);
          setInfo(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(wishListData);
  // console.log(info);
  const addToWishlist = (bookId: string) => {
    var url = APIURL + "v2/addBookToWishlist";
    var userId = "";
    var username = "";
    console.log(bookId);
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    console.log(userId);
    axios
      .post(url, {
        userId: userId,
        bookId: bookId,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
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
      getWishlistDetails()
      // getWishListCardDetails(wishListIds);
    }
  };
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
    axios
      .get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        if (resp.status === 200) {
          var data = resp.data.data;
          setBookAdAvailable(data.map((item: any) => { return item.bookId }));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <IonPage>
      <div className="swiper-area">
        <div className="searchHead">
          {/* <IonToolbar style={{ "--background": "transparent", padding: "0 5px", displ}}> */}
          <IonSearchbar
            placeholder="Add your favourite books"
            style={{
              "--background": "white",
              "--placeholder-color": "black",
              width: "90%",
              fontFamily: "Montserrat-sb"
            }}
            value={searchBook}
            onIonChange={(e) => {
              handleSearchBook(e);
            }}
          >
          </IonSearchbar>
          <IonIcon icon={addCircle} color="red" size="large" slot="end" onClick={() => { addToWishlist(wishListData[0]._id) }}></IonIcon>
          {/* </IonToolbar> */}
        </div>
        {/* <Swiper style={{ height: "15vh", background: "var(--bs-pText)" }} */}
        <Swiper style={{ height: "12vh" }}
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
          // spaceBetween={50}
          slidesPerView={1}
          // autoplay={true}
          autoplay={true}
          loop={true}
          // navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        // effect="fade"
        >
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p style={{ textAlign: "left", fontFamily: "Montserrat-sb", fontSize: "26px" }}>Fiction</p>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p style={{ textAlign: "left", fontFamily: "Montserrat-sb", fontSize: "26px" }}>Horror & Thriller</p>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p style={{ textAlign: "left", fontFamily: "Montserrat-sb", fontSize: "26px" }}>Love</p>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "0 15px" }}>
            <p style={{ textAlign: "left", fontFamily: "Montserrat-sb", fontSize: "26px" }}>Health</p>
          </SwiperSlide>
        </Swiper>
      </div>
      <IonContent className="wishlist-area">
        <div className="wishlist-books">
          {wishListData.map((item: any, idx: number) => {
            return (
              <div className="wishlist-card" key={idx}>
                <div className="wishlist-img">
                  <img src={defaultImage} alt="wishlist-book" style={{ width: "75px", height: "100px", borderRadius: "10%" }} />
                </div>
                <div className="wishlist-content">
                  <p style={{ fontSize: "16px", color: "var(--bs-sText)", fontFamily: "Montserrat-b" }}>{item.bookName}</p>
                  <p style={{ fontSize: "14px", margin: "10px 0", fontFamily: "Montserrat-sb", color: "var(--bs-pText)" }}>{item.bookAuthor}</p>
                  <p>₹ 65</p>
                  {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
                  {/* <IonButtons style={{ display: "flex", justifyContent: "flex-end" }}>
                    <IonButton className="wishlist-buybtn" style={{ fontSize: "15px" }}>
                      Buy Now
                    </IonButton>
                  </IonButtons> */}
                  {bookAdAvailable.includes(item._id) ? (
                    <>
                      <IonButtons style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IonButton className="wishlist-buybtn" style={{ fontSize: "15px" }}>
                          Buy Now
                        </IonButton>
                      </IonButtons>
                    </>
                  ) : (<></>)}
                  {/* </div> */}
                </div>
              </div>
            )
          })}

        </div>
      </IonContent>
    </IonPage >
  );
};

export default Search;
