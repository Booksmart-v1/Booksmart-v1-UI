import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonItem,
  IonChip,
  IonLabel,
  IonModal,
  IonButton,
  IonFooter,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonButtons,
  IonIcon,
  IonToggle,
  IonItemDivider,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonThumbnail,
  IonSearchbar,
  IonCheckbox,
  useIonAlert,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./homePage.css";
import { useState, useEffect, useRef } from "react";
import { pin } from "ionicons/icons";
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
  const [filteredInfo, setFilteredInfo] = useState(cardDetails);
  const [sellerDeets, setSellerDeets] = useState(cardDetails[0]);
  const [interest, setInterest] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [msg, setMsg] = useState("");

  const [showModal, setShowModal] = useState(false);

  // const User = localStorage.getItem("user");
  const getCardDetails = (lim: Number) => {
    const url = APIURL + "v2/getBookAds";
    var userId = "1233";
    var username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
      setCurrUser({ ...currUser, userId: userId, username: username })
    }
    axios
      .get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          var data = resp.data.data;
          for (const element of data) {
            element.bookImageUrl = element.bookImageUrl
              ? element.bookImageUrl
              : defaultImage;
          }
          let updateData = data.map((item: any) => ({ ...item, date: new Date(item.updatedAt.slice(0, -1)), time: new Date(item.updatedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }).substring(12, 17) }))
          setInfo(updateData);
          setFilteredInfo(updateData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [currUser, setCurrUser] = useState<any>({})
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getCardDetails(60);
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  var allTags = info.map((item) => item.tags.map((tag) => tag))
  var uniqueTags: string[] = []
  allTags.map((item) => item.map((tag) => uniqueTags.push(tag.toLowerCase())))
  var finalTags = Array.from(new Set(uniqueTags))

  // Sending Notify to seller
  const handleSendNotif = (sellerDetails: any) => {
    let receiverId = sellerDetails.sellerId;
    let bookId = sellerDetails._id;
    sendNotifyToSeller(receiverId, bookId)
    console.log(sellerDetails)
  }
  const sendNotifyToSeller = (receiverId: string, bookId: string) => {
    const url = APIURL + "v2/sendNotif";
    var userId = "";
    var username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .post(url, {
        userId: userId,
        userName: username,
        receiverId: receiverId,
        type: "interest",
        bookAdId: bookId
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          console.log(data)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var selectedInterest: string[] = []
  const handleInterest = (e: any, idx: number) => {
    if (e.detail.checked === true) {
      selectedInterest = [...selectedInterest, finalTags[idx]]
    }
    else {
      selectedInterest = selectedInterest.filter((item) => { return item !== e.detail.value })
    }
    if (selectedInterest.length > 0 && selectedInterest.length < 5) {
      var filterData = []
      console.log(selectedInterest)
      for (let i = 0; i < selectedInterest.length; i++) {
        filterData = info.filter((item) => {
          if (item.tags.map((tag) => { return tag.toLowerCase() }).includes(selectedInterest[i])) {
            return item;
          }
        })
        setFilteredInfo(filterData)
      }
    }
    else {
      setFilteredInfo(info);
    }
  }

  const [searchBook, setSearchBook] = useState('')
  const handleSearchBook = (e: any) => {
    // setSearchBook(e.detail.value);
    const searchText = e.detail.value;
    setSearchBook(searchText);
    if (searchText !== '') {
      const xyz = info.filter((item) => {
        if (item.bookName.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      });
      setFilteredInfo(xyz);
    }
    else {
      setFilteredInfo(info);
    }
  }

  const [presentAlert] = useIonAlert();
  const [sortByPrice, setSortByPrice] = useState(false);
  const [cardSkeletonLoaded, setcardSkeletonLoaded] = useState(false);
  const [sortByOldest, setSortByOldest] = useState(false);
  const handleSortByOldest = () => {
    setcardSkeletonLoaded(false);
    const timer = setTimeout(() => {
      setcardSkeletonLoaded(true);
      setSortByOldest(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setcardSkeletonLoaded(false);
    }
  }

  useEffect(() => {
    getCardDetails(60);
    const timer = setTimeout(() => {
      setcardSkeletonLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setcardSkeletonLoaded(false);
    };
  }, []);

  return (
    <IonPage className="backg">
      {/* <IonHeader className='header'></IonHeader> */}
      <IonContent
        onLoad={() => setShowToast1(true)}
        fullscreen
        className="boola"
        scrollY={false}
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
        <IonHeader style={{ margin: "10px auto 25px auto", width: "95%" }}>
          <div className="homesearch">
            <IonSearchbar placeholder="Search for a book" style={{ "--background": "white", "--placeholder-color": "black" }}
              value={searchBook} onIonChange={e => {
                handleSearchBook(e);
              }}
              showCancelButton="focus">
            </IonSearchbar>
          </div>
        </IonHeader>

        <IonModal trigger="open-modal" initialBreakpoint={0.5} style={{ "--border-radius": "20px" }}>
          <IonList style={{ padding: "10px" }}>
            {finalTags.map((item, idx: number) => (
              <IonItem style={{}}>
                <IonLabel style={{ marginLeft: "5px", textTransform: "capitalize" }}>{item}</IonLabel>
                <IonCheckbox value={item} slot="end" onIonChange={(e) => handleInterest(e, idx)}></IonCheckbox>
              </IonItem>
            ))}
          </IonList>
        </IonModal>

        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          mode="ios"
          // initialBreakpoint={1}
          // breakpoints={[0.8, 1]}
          title="Seller Details"
          // keyboardClose={true}
          onDidDismiss={() => setShowModal(false)}
          className="HPModal"
        >
          <IonHeader>
            <IonToolbar style={{ minHeight: "7vh" }}>
              <h2 style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "18px" }} >
                {sellerDeets.bookName.length < 30 ? sellerDeets.bookName : sellerDeets.bookName.substring(0, 30) + "..."}
              </h2>
              <IonButtons slot="end">
                <IonButton onClick={() => { setShowModal(false); }} slot="end" mode="ios">Close</IonButton>
              </IonButtons>
            </IonToolbar>
            <div className="HPModal-img"
              style={{
                // backgroundImage: `url(${sellerDeets.bookImageUrl})` 
                backgroundImage: `url(${"https://material.angular.io/assets/img/examples/shiba1.jpg"})`
              }}
            >
              <img src={"https://material.angular.io/assets/img/examples/shiba1.jpg"} style={{ width: "35%", height: "20vh" }} alt="book" />
            </div>
          </IonHeader>
          <IonContent>
            <div style={{ maxWidth: "90%", maxHeight: "10vh", textAlign: "center", margin: "10px auto" }}>
              <p style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "goldenrod", fontSize: "22px", marginBottom: "5px" }} >
                {sellerDeets.bookName.length < 45 ? sellerDeets.bookName : sellerDeets.bookName.substring(0, 45) + "..."}
              </p>
              <p style={{ textAlign: "center", fontFamily: "Montserrat-SB", color: "var(--bs-pText)", fontSize: "18px" }} >
                {sellerDeets.bookAuthor}
              </p>
            </div>
            <div className="HPModal-content">
              <p className="HPModal-desc">
                {sellerDeets.bookDescription.length < 180 ? sellerDeets.bookDescription : sellerDeets.bookDescription.substring(0, 180) + "..."}
              </p>
              <div className="HPModal-sellerInfo">
                <p style={{ fontFamily: "Montserrat-b", fontSize: "25px" }}>Seller Details</p>
                <IonItemDivider style={{ marginLeft: "0" }}></IonItemDivider>
                <br />
                <p>Name: <b style={{ color: "goldenrod" }}>{sellerDeets.sellerName}</b></p>
                <p style={{ margin: "10px 0" }}>City: <b style={{ color: "goldenrod" }}>{sellerDeets.sellerAddress}</b></p>
                <p>Price: <b style={{ color: "goldenrod" }}>₹ {sellerDeets.bookPrice}</b></p>
                <p></p>
              </div>
              <div className="HPModal-chips">
                {sellerDeets.tags.map((tag, index) => (
                  <IonChip color="warning" key={index} style={{ color: "black", border: "1px solid black", background: "var(--bs-pBg)" }}>
                    <IonLabel style={{ fontFamily: "Montserrat-sb", fontSize: "18px", textTransform: "capitalize" }}>{tag}</IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>
            {/* <IonItemDivider> </IonItemDivider> */}
          </IonContent>
          {
            sellerDeets.sellerId === currUser.userId ? (
              <IonFooter collapse="fade" style={{ color: "gray", textAlign: "center", fontFamily: "Montserrat-b", margin: "10px 0" }}>
                <h3>Book On Sale</h3>
              </IonFooter>
            ) : (
              <IonFooter className="HPModal-toggle">
                <IonItem style={{ width: "90%", padding: "0 10px" }}>
                  <IonLabel
                    style={{
                      fontFamily: "Montserrat-b",
                      fontSize: "24px",
                    }}
                  >
                    Interested?
                  </IonLabel>
                  <IonToggle
                    slot="end"
                    style={{ color: `${interest ? "red" : "green"}` }}
                    onClick={() => {
                      if (interest) {
                        setMsg("Request Retracted!");
                        setShowToast2(true);
                      } else {
                        setMsg(`Request Sent to ${sellerDeets.sellerName}!`);
                        setShowToast2(true);
                        handleSendNotif(sellerDeets)
                      }
                    }}
                  >
                  </IonToggle>
                </IonItem>
              </IonFooter>
            )
          }
        </IonModal>

        <IonGrid className="oola">
          <div style={{ position: "fixed", width: "100%", zIndex: "10" }}>
            <div className="chips">
              <span className="chip">
                <IonChip color="warning"
                  onClick={() => {
                    presentAlert({
                      header: 'Sort By',
                      buttons: ['OK'],
                      inputs: [
                        {
                          label: 'Oldest',
                          type: 'radio',
                          value: 'Oldest',
                          handler: () => { handleSortByOldest(); }
                        },
                        {
                          label: 'Price',
                          type: 'radio',
                          value: 'Price',
                          handler: () => { setSortByPrice(true) }
                        }
                      ],
                    })
                  }
                  }>
                  <IonLabel>Sort By</IonLabel>
                </IonChip>
              </span>
              <span className="chip">
                <IonChip color="warning" id="open-modal">
                  <IonLabel>Interest</IonLabel>
                </IonChip>
              </span>
              <span className="chip">
                <IonChip color="warning">
                  <IonLabel>Most Rated</IonLabel>
                </IonChip>
              </span>
            </div>
          </div>
          {/* sort((a: any, b: any) => { return b.bookPrice - a.bookPrice }) */}
          {sortByPrice ? (<>
            <div className="homepage-cards-area">
              {filteredInfo.length > 0 ? (<>
                {
                  cardSkeletonLoaded &&
                  filteredInfo.sort((a: any, b: any) => { return b.bookPrice - a.bookPrice }).map((element: any, index) => {
                    return (
                      <>
                        <IonCard key={index} className="homepage-card" onClick={() => {
                          setSellerDeets(element);
                          setShowModal(true);
                        }}>
                          <div className="homepage-card-img">
                            <img alt="Book" className="pic" src={element.bookImageUrl} />
                          </div>
                          <div className="homepage-card-content">
                            <div className="homepage-card-time">
                              <span style={{ color: "var(--bs-sText)", marginLeft: "10px" }}>{element.date.getDate() + '-' + (element.date.getMonth() + 1) + '-' + element.date.getFullYear()}</span>
                            </div>
                            <IonCardTitle style={{
                              fontSize: "0.87rem", fontFamily: "Montserrat-b"
                            }}>
                              {element.bookName.length < 30 ? element.bookName : element.bookName.substring(0, 30) + "..."}
                            </IonCardTitle>
                            <IonCardSubtitle style={{ fontSize: "0.7rem", fontFamily: "Montserrat-sb" }}>
                              {element.bookAuthor}
                            </IonCardSubtitle>
                            <div className="homepage-card-chips">
                              {element.tags.map((tag: string, index: number) => (
                                <IonChip color="warning" key={index} style={{ color: "black", border: "1px solid black", margin: "0 5px", background: "var(--bs-pBg)" }}>
                                  <IonLabel style={{ fontFamily: "Montserrat-sb", fontSize: "12px", textTransform: "capitalize" }}>{tag}</IonLabel>
                                </IonChip>
                              ))}
                            </div>
                            <div>
                              <p style={{ fontSize: "18px", fontFamily: "Montserrat-SB" }}>Price: ₹ {element.bookPrice}</p>
                            </div>
                          </div>
                        </IonCard>
                      </>
                    );
                  })
                }
                {
                  !cardSkeletonLoaded &&
                  filteredInfo.map((element, index) => {
                    return (
                      <IonCard key={index} className="homepage-card" onClick={() => {
                        setSellerDeets(element);
                        setShowModal(true)
                      }}>
                        <div className="homepage-card-img">
                          <IonThumbnail>
                            <IonSkeletonText animated={true}
                              style={{
                                width: "110px",
                                minHeight: "140px",
                                borderRadius: "15px 0 0 15px",
                                position: "absolute", top: 0, left: 0
                              }}
                            ></IonSkeletonText>
                          </IonThumbnail>
                        </div>
                        <div className="homepage-card-content" style={{ marginLeft: "75px" }}>
                          <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                          <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                          <div className="homepage-card-chips">
                            {element.tags.map(() => (
                              <IonThumbnail slot="start">
                                <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                              </IonThumbnail>
                            ))}
                          </div>
                          <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                        </div>
                      </IonCard>
                    )
                  })
                }
              </>) : (<>
                <div className="noBooks">
                  <img src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif" alt="Sorry" width={"100px"} />
                  <p>Currently there are no books available with this name.</p>
                </div>
              </>)}
            </div>
          </>) : (<>
            <div className={sortByOldest ? "homepage-cards-area" : "homepage-cards-area sortNewest"}>
              {filteredInfo.length > 0 ? (<>
                {
                  cardSkeletonLoaded &&
                  filteredInfo.map((element: any, index) => {
                    return (
                      <>
                        <IonCard key={index} className="homepage-card" onClick={() => {
                          setSellerDeets(element);
                          setShowModal(true);
                        }}>
                          <div className="homepage-card-img">
                            <img alt="Book" className="pic" src={element.bookImageUrl} />
                          </div>
                          <div className="homepage-card-content">
                            <div className="homepage-card-time">
                              <span style={{ color: "var(--bs-sText)", marginLeft: "10px" }}>{element.date.getDate() + '-' + (element.date.getMonth() + 1) + '-' + element.date.getFullYear()}</span>
                            </div>
                            <IonCardTitle style={{
                              fontSize: "0.87rem", fontFamily: "Montserrat-b"
                            }}>
                              {element.bookName.length < 30 ? element.bookName : element.bookName.substring(0, 30) + "..."}
                            </IonCardTitle>
                            <IonCardSubtitle style={{ fontSize: "0.7rem", fontFamily: "Montserrat-sb" }}>
                              {element.bookAuthor}
                            </IonCardSubtitle>
                            <div className="homepage-card-chips">
                              {element.tags.map((tag: string, index: number) => (
                                <IonChip color="warning" key={index} style={{ color: "black", border: "1px solid black", margin: "0 5px", background: "var(--bs-pBg)" }}>
                                  <IonLabel style={{ fontFamily: "Montserrat-sb", fontSize: "12px", textTransform: "capitalize" }}>{tag}</IonLabel>
                                </IonChip>
                              ))}
                            </div>
                            <div>
                              <p style={{ fontSize: "18px", fontFamily: "Montserrat-SB" }}>Price: ₹ {element.bookPrice}</p>
                            </div>
                          </div>
                        </IonCard>
                      </>
                    );
                  })
                }
                {
                  !cardSkeletonLoaded &&
                  filteredInfo.map((element, index) => {
                    return (
                      <IonCard key={index} className="homepage-card" onClick={() => {
                        setSellerDeets(element);
                        setShowModal(true)
                      }}>
                        <div className="homepage-card-img">
                          <IonThumbnail>
                            <IonSkeletonText animated={true}
                              style={{
                                width: "110px",
                                minHeight: "140px",
                                borderRadius: "15px 0 0 15px",
                                position: "absolute", top: 0, left: 0
                              }}
                            ></IonSkeletonText>
                          </IonThumbnail>
                        </div>
                        <div className="homepage-card-content" style={{ marginLeft: "75px" }}>
                          <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                          <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                          <div className="homepage-card-chips">
                            {element.tags.map(() => (
                              <IonThumbnail slot="start">
                                <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                              </IonThumbnail>
                            ))}
                          </div>
                          <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                        </div>
                      </IonCard>
                    )
                  })
                }
              </>) : (<>
                <div className="noBooks">
                  <img src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif" alt="Sorry" width={"100px"} />
                  <p>Currently there are no books available with this name.</p>
                </div>
              </>)}
            </div>
          </>)}
        </IonGrid>
      </IonContent >
    </IonPage >
  );
};

export default Tab1;
