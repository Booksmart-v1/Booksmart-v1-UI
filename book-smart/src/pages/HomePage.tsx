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
  IonList,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSkeletonText,
  IonThumbnail,
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
  closeCircle,
  pin
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
  const [filteredInfo, setFilteredInfo] = useState(cardDetails);
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
          setFilteredInfo(data);
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

  // Searched Chips
  const [selectedChipsArr, setSelectedChipsArr] = useState([]);

  const handleInputChange = (chipArr: any) => {
    if (chipArr.length >= 0 && chipArr.length < 5) {
      let xyz = chipArr.map((idx: number, tag: string) => ({ key: idx, label: tag, hide: false }))
      setSelectedChipsArr(xyz);
    }
    else if (chipArr.length >= 5) {
      console.log("More than 5! Not Allowed.")
    }
    if (chipArr.length > 0 && chipArr.length < 5) {
      let lowerCasedChips = chipArr.map((chip: string) => { return chip.toLowerCase() });
      var filterData = []
      for (let i = 0; i < lowerCasedChips.length; i++) {
        filterData = info.filter((item) => {
          if (item.tags.map((tag) => { return tag.toLowerCase() }).includes(lowerCasedChips[i])) {
            return item;
          }
        })
        setFilteredInfo(filterData)
      }
    }
    else {
      setFilteredInfo(info);
    }
    console.log("ChipArr: ", selectedChipsArr);
  }

  let allTags = info.map((item) => item.tags.map((tag) => tag))
  var uniqueTags: string[] = []
  allTags.map((item) => item.map((tag) => uniqueTags.push(tag.toLowerCase())))
  let finalTags = Array.from(new Set(uniqueTags))

  // Sending Notify to seller
  const handleSendNotif = (sellerDetails: any) => {
    let receiverId = sellerDetails.sellerId;
    let bookId = sellerDetails._id;
    sendNotifyToSeller(receiverId, bookId)
    console.log(sellerDetails)
  }
  const sendNotifyToSeller = (receiverId: string, bookId: string) => {
    const url = APIURL + "v2/sendNotif";
    let userId = "";
    let username = "";
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

  const [cardSkeletonLoaded, setcardSkeletonLoaded] = useState(false);
  const [sortByNewest, setSortByNewest] = useState(false);
  const handleSortNewest = () => {
    setcardSkeletonLoaded(false);
    const timer = setTimeout(() => {
      setcardSkeletonLoaded(true);
      setSortByNewest(true);
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
        <div className="selectInput">
          <IonList style={{ margin: "10px auto 0 auto", width: "90%" }}>
            <IonItem >
              <IonSelect placeholder="Select interest" multiple={true}
                onIonChange={(e) => handleInputChange(e.detail.value)} interface="popover"
              >
                {finalTags.map((item) => (<IonSelectOption value={item} style={{ textTransform: "capitalize" }}>{item}</IonSelectOption>))}
              </IonSelect>
            </IonItem>
          </IonList>
          <div className="searching-chips">
            {selectedChipsArr.map((item: any) =>
              <IonChip
                className="searching-items"
                key={item.label}
                outline
                color="primary"
              >
                <IonIcon icon={pin} />
                <IonLabel style={{ textTransform: "capitalize" }}>{item.key}</IonLabel>
                {/* <IonIcon
                    style={{ height: "20px" }}
                    onClick={() => hideRecent(i)}
                    icon={closeCircle}
                  /> */}
              </IonChip>
            )}
          </div>
          <br />
        </div>
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
            <div style={{ width: "90%", maxHeight: "10vh", textAlign: "center", margin: "10px auto" }}>
              <p style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "goldenrod", fontSize: "22px", marginBottom: "5px" }} >
                {sellerDeets.bookName.length < 45 ? sellerDeets.bookName : sellerDeets.bookName.substring(0, 45) + "..."}
              </p>
              <p style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "18px" }} >
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
        </IonModal>

        <IonGrid className="oola">
          <div style={{ position: "fixed", width: "100%", zIndex: "10" }}>
            <div className="chips">
              <span className="chip">
                <IonChip color="warning" onClick={handleSortNewest}>
                  <IonLabel>Newest</IonLabel>
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
            </div>
          </div>
          <div className={sortByNewest ? "homepage-cards-area sortNewest" : "homepage-cards-area"}>
            {
              cardSkeletonLoaded &&
              filteredInfo.map((element, index) => {
                return (
                  <>
                    <IonCard key={index} className="homepage-card" onClick={() => {
                      setSellerDeets(element);
                      setShowModal(true)
                    }}>
                      <div className="homepage-card-img">
                        <img alt="Book" className="pic" src={element.bookImageUrl} />
                      </div>
                      <div className="homepage-card-content">
                        <IonCardTitle style={{
                          fontSize: "1rem", fontFamily: "Montserrat-b"
                        }}>
                          {element.bookName.length < 30 ? element.bookName : element.bookName.substring(0, 30) + "..."}
                        </IonCardTitle>
                        <IonCardSubtitle style={{ fontSize: "0.7rem", fontFamily: "Montserrat-sb" }}>
                          {element.bookAuthor}
                        </IonCardSubtitle>
                        <div className="homepage-card-chips">
                          {element.tags.map((tag, index) => (
                            <IonChip color="warning" key={index} style={{ color: "black", border: "1px solid black", margin: "0 5px", background: "var(--bs-pBg)" }}>
                              <IonLabel style={{ fontFamily: "Montserrat-sb", fontSize: "13px", textTransform: "capitalize" }}>{tag}</IonLabel>
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
                      {/* <IonCardTitle style={{ fontSize: "1rem", fontFamily: "Montserrat-b" }}>
                        {element.bookName.length < 30 ? element.bookName : element.bookName.substring(0, 30) + "..."}
                      </IonCardTitle> */}
                      <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                      <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                      <div className="homepage-card-chips">
                        {element.tags.map((tag, index) => (
                          // <IonChip color="warning" key={index} style={{ color: "black", border: "1px solid black", margin: "0 5px", background: "var(--bs-pBg)" }}>
                          //   <IonLabel style={{ fontFamily: "Montserrat-sb", fontSize: "13px", textTransform: "capitalize" }}>{tag}</IonLabel>
                          // </IonChip>
                          <IonThumbnail slot="start">
                            <IonSkeletonText animated={true}></IonSkeletonText>
                          </IonThumbnail>
                        ))}
                      </div>
                      <IonSkeletonText animated={true} style={{ 'width': '100%' }}></IonSkeletonText>
                    </div>
                  </IonCard>
                )
              })
            }
          </div>
        </IonGrid>
      </IonContent >
    </IonPage >
  );
};

export default Tab1;
