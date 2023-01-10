import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardSubtitle,
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
  IonSkeletonText,
  IonThumbnail,
  IonSearchbar,
  IonCheckbox,
  useIonAlert,
  IonRow,
} from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import "./homePage.css";
import { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import {
  heart,
  heartOutline,
  ellipse,
  close,
  location,
  navigateCircle,
} from "ionicons/icons";
import { APIURL } from "../constants";
import axios from "axios";
import moment from "moment";

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

interface Loc {
  lat: number;
  lon: number;
}

const Tab1: React.FC = () => {
  const [info, setInfo] = useState(cardDetails);
  const [filteredInfo, setFilteredInfo] = useState(cardDetails);
  const [sellerDeets, setSellerDeets] = useState(cardDetails[0]);
  const [interest, setInterest] = useState(false);
  const [wishListed, setWishListed] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  const [msg, setMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(19.1239285);
  const [longitude, setLongitude] = useState(72.9094407);

  // const User = localStorage.getItem("user");
  const getCardDetails = (lim: Number) => {
    const url = APIURL + "v2/getBookAds";
    var userId = "1233";
    var username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
      setCurrUser({ ...currUser, userId: userId, username: username });
    }
    axios
      .get(url + `?limit=${lim}&userId=${userId}`)
      .then((resp) => {
        if (resp.status === 200) {
          var data = resp.data.data;
          console.log(data);
          for (const element of data) {
            element.bookImageUrl = element.bookImageUrl
              ? element.bookImageUrl
              : defaultImage;

            element.lat = element.lat ? element.lat : 19.121;
            element.lon = element.lon ? element.lon : 72.899;
          }
          console.log(data);
          console.log(wishListHeart);
          let updateData = data.map((item: any) => {
            // const ab: Loc = getLatLon(item);

            return {
              ...item,
              date: new Date(item.updatedAt.slice(0, -1)),
              time: new Date(item.updatedAt)
                .toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
                .substring(12, 17),
              // lat: ab.lat,
              // lon: ab.lon,
              newDate: moment(item.updatedAt).format("YYYYMMDD"),
              isLiked: wishListHeart.includes(item.bookId),
            };
          });
          updateData = updateData.sort((a: any, b: any) =>
            b.updatedAt.localeCompare(a.updatedAt)
          );
          updateData = updateData.filter((item: any) => {
            // console.log(latitude);
            // console.log(item.lat);
            // console.log(longitude);
            // console.log(item.lon);
            const d = distance(latitude, item.lat, longitude, item.lon);
            console.log(d);
            return d < 10;
          });
          console.log(updateData);
          setInfo(updateData);
          setFilteredInfo(updateData);
          // Interest Chip
          let allTags = updateData.map((item: any) =>
            item.tags.map((tag: any) => tag)
          );
          let uniqueTags: string[] = [];
          allTags.map((item: any) =>
            item.map((tag: any) => uniqueTags.push(tag.toLowerCase()))
          );
          let finalTags = Array.from(new Set(uniqueTags)).sort();
          setTags(
            finalTags.map((item) => {
              return { name: item, isChecked: false };
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLatLon = (item: any): Loc => {
    const options = {
      method: "GET",
      url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${item.sellerPincode}`,
      headers: {
        "X-RapidAPI-Key": "97cc9d3ae5mshc34d4671b043d42p1451eajsnb18bf2761e25",
        "X-RapidAPI-Host":
          "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
      },
    };
    axios
      .get(
        `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${item.sellerPincode}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "97cc9d3ae5mshc34d4671b043d42p1451eajsnb18bf2761e25",
            "X-RapidAPI-Host":
              "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const ans: Loc = {
          lat: response.data[0].lat,
          lon: response.data[0].lng,
        };
        return ans;
      })
      .catch((error) => {
        console.error(error);
        const ans: Loc = {
          lat: 19.121,
          lon: 72.899,
        };
        return ans;
      });
    const ans: Loc = {
      lat: 19.223,
      lon: 71.333,
    };
    return ans;
  };

  const [currUser, setCurrUser] = useState<any>({});
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getCardDetails(60);
    setSortByType({
      newest: true,
      oldest: false,
      price: false,
      popular: false,
    });
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  const handleSendNotif = (sellerDetails: any, msg: string) => {
    let receiverId = sellerDetails.sellerId;
    let bookId = sellerDetails._id;
    sendNotifyToSeller(receiverId, bookId, msg);
  };
  const sendNotifyToSeller = (
    receiverId: string,
    bookId: string,
    msg: string
  ) => {
    if (msg === "send") {
      var url = APIURL + "v2/sendNotif";
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
          bookAdId: bookId,
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
    } else {
      var url = APIURL + "v2/removeInterestNotification";
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
          bookAdId: bookId,
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
  };
  let allTags = info.map((item: any) => item.tags.map((tag: any) => tag));
  let uniqueTags: string[] = [];
  allTags.map((item: any) =>
    item.map((tag: any) => uniqueTags.push(tag.toLowerCase()))
  );
  let finalTags = Array.from(new Set(uniqueTags)).sort();
  const [tags, setTags] = useState(
    finalTags.map((item: any) => {
      return { name: item, isChecked: false };
    })
  );

  const [selectAll, setSelectAll] = useState(true);
  const handleInterestClick = (e: any, idx: number) => {
    if (e.detail.value === "All" && e.detail.checked === true && idx === -1) {
      setSelectAll(true);
      setFilteredInfo(info);
      let a = tags.map((item) => {
        return { ...item, isChecked: false };
      });
      setTags(a);
      // var newTags = tags.map((item) => { return { ...item, isChecked: false } })
    } else {
      setSelectAll(false);
      console.log(tags);
      let currTag = tags;
      currTag[idx].isChecked = !currTag[idx].isChecked;
      console.log(currTag);
      let selectedTags = currTag.filter((item) => {
        if (item.isChecked) {
          return item;
        }
      });
      console.log(selectedTags);
      if (selectedTags.length > 0) {
        setFilteredInfo(
          info.filter((item) => {
            let ok = false;
            // console.log(selectedTags);
            selectedTags.forEach((t) => {
              if (
                item.tags
                  .map((tag) => {
                    return tag.toLowerCase();
                  })
                  .includes(t.name)
              ) {
                ok = true;
              }
            });
            if (ok) {
              return item;
            }
          })
        );
      } else {
        setSelectAll(true);
      }

      setTags(currTag);
    }
  };

  const [searchBook, setSearchBook] = useState("");

  const handleSearchBook = (e: any) => {
    // setSearchBook(e.detail.value);
    const searchText = e.detail.value;
    setSearchBook(searchText);
    if (searchText !== "") {
      const xyz = info.filter((item) => {
        if (item.bookName.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
      });
      setFilteredInfo(xyz);
    } else {
      setFilteredInfo(info);
    }
  };

  const [presentAlert] = useIonAlert();
  const [cardSkeletonLoaded, setcardSkeletonLoaded] = useState(false);

  useEffect(() => {
    
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
    getWishlistDetails();
    // getCardDetails(60);
    const timer = setTimeout(() => {
      setcardSkeletonLoaded(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setcardSkeletonLoaded(false);
    };
  }, []);

  const [sortByType, setSortByType] = useState({
    newest: true,
    oldest: false,
    price: false,
    popular: false,
  });
  const handleSortBy = (type: string) => {
    setcardSkeletonLoaded(false);
    const timer = setTimeout(() => {
      setcardSkeletonLoaded(true);
      if (type === "newest") {
        const sortedArray = filteredInfo.sort((a: any, b: any) =>
          b.updatedAt.localeCompare(a.updatedAt)
        );
        setFilteredInfo(sortedArray);
        console.log(filteredInfo);
        setSortByType({
          newest: true,
          oldest: false,
          price: false,
          popular: false,
        });
      }
      if (type === "price") {
        const sortedArray = filteredInfo.sort(
          (a: any, b: any) => a.bookPrice - b.bookPrice
        );
        setFilteredInfo(sortedArray);
        console.log(filteredInfo);
        setSortByType({
          newest: false,
          oldest: false,
          price: true,
          popular: false,
        });
      }
      if (type === "oldest") {
        const sortedArray = filteredInfo.sort((a: any, b: any) =>
          a.updatedAt.localeCompare(b.updatedAt)
        );
        setFilteredInfo(sortedArray);
        console.log(filteredInfo);
        setSortByType({
          newest: false,
          oldest: true,
          price: false,
          popular: false,
        });
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
      setcardSkeletonLoaded(false);
    };
  };

  // Add to Wishlist
  const [showWishlistToast1, setShowWishlistToast1] = useState(false);

  const [showWishlistToast2, setShowWishlistToast2] = useState(false);

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
  };
  const [wishListHeart, setWishListHeart] = useState<any>([]);
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
          let wishListIds = Array.from(new Set(data[0].bookIds));
          setWishListHeart(wishListIds);
          getCardDetails(60);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const distance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  };

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
            <IonSearchbar
              placeholder="Search for a book"
              style={{
                "--background": "white",
                "--placeholder-color": "black",
              }}
              value={searchBook}
              onIonChange={(e) => {
                handleSearchBook(e);
              }}
              showCancelButton="focus"
            ></IonSearchbar>
          </div>
        </IonHeader>

        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.75]}
          style={{ "--border-radius": "20px", zoom: "0.95" }}
        >
          <IonContent>
            <IonList style={{ padding: "30px 15px" }} className="ion-padding">
              <IonItem className="ion-no-padding" lines="none">
                <IonLabel
                  style={{
                    marginLeft: "5px",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat-sb",
                  }}
                >
                  All
                </IonLabel>
                <IonCheckbox
                  value="All"
                  slot="end"
                  checked={selectAll}
                  onIonChange={(e) => {
                    setSelectAll(!selectAll);
                    handleInterestClick(e, -1);
                  }}
                ></IonCheckbox>
              </IonItem>
              {tags.map((item, idx: number) => (
                <IonItem className="ion-no-padding" lines="none">
                  <IonLabel
                    style={{
                      marginLeft: "5px",
                      textTransform: "capitalize",
                      fontFamily: "Montserrat-sb",
                    }}
                  >
                    {item.name}
                  </IonLabel>
                  <IonCheckbox
                    value={item.name}
                    slot="end"
                    checked={item.isChecked}
                    onIonChange={(e) => {
                      handleInterestClick(e, idx);
                    }}
                    disabled={selectAll}
                  ></IonCheckbox>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
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
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-B",
                  color: "var(--bs-pText)",
                  fontSize: "18px",
                }}
              >
                {sellerDeets.bookName.length < 30
                  ? sellerDeets.bookName
                  : sellerDeets.bookName.substring(0, 30) + "..."}
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
            <div
              className="HPModal-img"
              style={{
                // backgroundImage: `url(${sellerDeets.bookImageUrl})`
                backgroundImage: `url(${"https://material.angular.io/assets/img/examples/shiba1.jpg"})`,
              }}
            >
              <img
                src={
                  "https://material.angular.io/assets/img/examples/shiba1.jpg"
                }
                style={{ width: "35%", height: "20vh" }}
                alt="book"
              />
            </div>
          </IonHeader>
          <IonContent>
            <div
              style={{
                maxWidth: "90%",
                maxHeight: "10vh",
                textAlign: "center",
                margin: "10px auto",
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
                {sellerDeets.bookName.length < 45
                  ? sellerDeets.bookName
                  : sellerDeets.bookName.substring(0, 45) + "..."}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-SB",
                  color: "var(--bs-pText)",
                  fontSize: "18px",
                }}
              >
                {sellerDeets.bookAuthor}
              </p>
            </div>
            <div className="HPModal-content">
              <p className="HPModal-desc">
                {sellerDeets.bookDescription.length < 180
                  ? sellerDeets.bookDescription
                  : sellerDeets.bookDescription.substring(0, 180) + "..."}
              </p>
              <div className="HPModal-sellerInfo">
                <p style={{ fontFamily: "Montserrat-b", fontSize: "25px" }}>
                  Seller Details
                </p>
                <IonItemDivider style={{ marginLeft: "0" }}></IonItemDivider>
                <br />
                <p>
                  Name:{" "}
                  <b style={{ color: "goldenrod" }}>{sellerDeets.sellerName}</b>
                </p>
                <p style={{ margin: "10px 0" }}>
                  City:{" "}
                  <b style={{ color: "goldenrod" }}>
                    {sellerDeets.sellerAddress}
                  </b>
                </p>
                <p>
                  Price:{" "}
                  <b style={{ color: "goldenrod" }}>
                    ₹ {sellerDeets.bookPrice}
                  </b>
                </p>
                <p></p>
              </div>
              <div className="HPModal-chips">
                {sellerDeets.tags.map((tag, index) => (
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
                        fontSize: "18px",
                        textTransform: "capitalize",
                      }}
                    >
                      {tag.toLowerCase()}
                    </IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>
            {/* <IonItemDivider> </IonItemDivider> */}
          </IonContent>
          {sellerDeets.sellerId === currUser.userId ? (
            <IonFooter
              collapse="fade"
              style={{
                color: "gray",
                textAlign: "center",
                fontFamily: "Montserrat-b",
                margin: "10px 0",
              }}
            >
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
                  style={{ color: `${interest ? "green" : "red"}` }}
                  checked={interest}
                  onClick={() => {
                    if (interest) {
                      setMsg("Request Retracted!");
                      handleSendNotif(sellerDeets, "retract");
                      setShowToast2(true);
                      setInterest(false);
                    } else {
                      setMsg(`Request Sent to ${sellerDeets.sellerName}!`);
                      setInterest(true);
                      setShowToast2(true);
                      handleSendNotif(sellerDeets, "send");
                    }
                    getCardDetails(60);
                  }}
                ></IonToggle>
              </IonItem>
            </IonFooter>
          )}
        </IonModal>
        {/* <IonModal
          isOpen={showModal}
          swipeToClose={true}
          mode="ios"
          initialBreakpoint={1}
          breakpoints={[0.8, 1]}
          title="Location"
          keyboardClose={true}
          onDidDismiss={() => setShowModal(false)}
          className="HPModal"
        >
          <IonHeader>
            <IonToolbar style={{ minHeight: "7vh" }}>
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-B",
                  color: "var(--bs-pText)",
                  fontSize: "25px",
                  marginLeft: "60px",
                }}
              >
                Location
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
          <IonContent>
            <IonItem
              style={{}}
              onClick={() => {
                if ("geolocation" in navigator) {
                  console.log("Available");
                  navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                  });
                } else {
                  console.log("Not Available");
                }
              }}
            >
              <IonRow>
                <IonItem>
                  <IonIcon
                    icon={navigateCircle}
                    color="success"
                    style={{
                      marginRight: "5px",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3
                      style={{
                        color: "blue",
                        fontFamily: "Montserrat-SB",
                        fontSize: "18px",
                      }}
                    >
                      Use Current Location
                    </h3>
                  </IonLabel>
                </IonItem>
              </IonRow>
            </IonItem>
          </IonContent>
        </IonModal> */}
        <IonGrid className="oola">
          <div style={{ position: "fixed", width: "100%", zIndex: "10" }}>
            <div className="chips">
              <span className="chip">
                <IonChip
                  color="warning"
                  onClick={() => {
                    presentAlert({
                      header: "Sort By",
                      buttons: ["OK"],
                      inputs: [
                        {
                          checked: sortByType.newest,
                          label: "Newest",
                          type: "radio",
                          value: "Newest",
                          handler: () => {
                            handleSortBy("newest");
                          },
                        },
                        {
                          checked: sortByType.oldest,
                          label: "Oldest",
                          type: "radio",
                          value: "Oldest",
                          handler: () => {
                            handleSortBy("oldest");
                          },
                        },
                        {
                          checked: sortByType.price,
                          label: "Price",
                          type: "radio",
                          value: "Price",
                          handler: () => {
                            handleSortBy("price");
                          },
                        },
                      ],
                    });
                  }}
                >
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
                  <IonLabel>Popular</IonLabel>
                </IonChip>
              </span>
            </div>
          </div>
          <div className={"homepage-cards-area"}>
            {filteredInfo.length > 0 ? (
              <>
                {cardSkeletonLoaded &&
                  filteredInfo.map((element: any, index) => {
                    return (
                      <>
                        <IonCard
                          key={index}
                          className="homepage-card"
                          onClick={() => {
                            setSellerDeets(element);
                            const con: boolean =
                              element.interestedBuyers.includes(
                                currUser.userId
                              );
                            setInterest(con);
                            setShowModal(true);
                          }}
                        >
                          <IonToast
                            isOpen={showWishlistToast1}
                            onDidDismiss={() => setShowWishlistToast1(false)}
                            message="Book added to wishlist!"
                            duration={1500}
                          />
                          <IonToast
                            isOpen={showWishlistToast2}
                            onDidDismiss={() => setShowWishlistToast2(false)}
                            message="Book removed from wishlist!"
                            duration={1500}
                          />
                          <div className="homepage-card-heart">
                            <IonIcon
                              key={index}
                              icon={element.isLiked ? heart : heartOutline}
                              color="danger"
                              onClick={(e) => {
                                if (wishListed) {
                                  setWishListed(false);
                                  // setShowWishlistToast2(true);
                                } else {
                                  addToWishlist(element.bookId);
                                  setWishListed(true);
                                  // setShowWishlistToast1(true);
                                }
                                getWishlistDetails();
                                e.stopPropagation();
                              }}
                            />
                          </div>
                          <div className="homepage-card-img">
                            <img
                              alt="Book"
                              className="pic"
                              src={element.bookImageUrl}
                            />
                          </div>
                          <div className="homepage-card-content">
                            <div className="homepage-card-time">
                              {/* <span style={{ color: "var(--bs-sText)", marginLeft: "10px" }}>{element.date.getDate() + '-' + (element.date.getMonth() + 1) + '-' + element.date.getFullYear()}</span> */}
                            </div>
                            <h2
                              style={{
                                fontSize: "0.87rem",
                                fontFamily: "Montserrat-B",
                                margin: 0,
                                color: "black",
                              }}
                            >
                              {element.interestedBuyers.includes(
                                currUser.userId
                              ) && (
                                // <div className="interested-notify"></div>
                                <IonIcon
                                  icon={ellipse}
                                  color="success"
                                  style={{
                                    marginRight: "5px",
                                    width: "10px",
                                    height: "10px",
                                  }}
                                />
                              )}
                              {element.bookName.length < 30
                                ? element.bookName
                                : element.bookName.substring(0, 30) + "..."}
                            </h2>
                            <IonCardSubtitle
                              style={{
                                fontSize: "0.7rem",
                                fontFamily: "Montserrat-sb",
                              }}
                            >
                              {element.bookAuthor}
                            </IonCardSubtitle>
                            <div className="homepage-card-chips">
                              {element.tags.map(
                                (tag: string, index: number) => (
                                  <IonChip
                                    color="warning"
                                    key={index}
                                    style={{
                                      color: "black",
                                      border: "1px solid black",
                                      margin: "0 5px",
                                      background: "var(--bs-pBg)",
                                    }}
                                  >
                                    <IonLabel
                                      style={{
                                        fontFamily: "Montserrat-sb",
                                        fontSize: "12px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {tag.toLowerCase()}
                                    </IonLabel>
                                  </IonChip>
                                )
                              )}
                            </div>
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
                          </div>
                        </IonCard>
                      </>
                    );
                  })}
                {!cardSkeletonLoaded &&
                  filteredInfo.map((element, index) => {
                    return (
                      <IonCard
                        key={index}
                        className="homepage-card"
                        onClick={() => {
                          setSellerDeets(element);
                          setShowModal(true);
                        }}
                      >
                        <div className="homepage-card-img">
                          <IonThumbnail>
                            <IonSkeletonText
                              animated={true}
                              style={{
                                width: "110px",
                                minHeight: "140px",
                                borderRadius: "15px 0 0 15px",
                                position: "absolute",
                                top: 0,
                                left: 0,
                              }}
                            ></IonSkeletonText>
                          </IonThumbnail>
                        </div>
                        <div
                          className="homepage-card-content"
                          style={{ marginLeft: "75px" }}
                        >
                          <IonSkeletonText
                            animated={true}
                            style={{ width: "100%" }}
                          ></IonSkeletonText>
                          <IonSkeletonText
                            animated={true}
                            style={{ width: "80%" }}
                          ></IonSkeletonText>
                          <div className="homepage-card-chips">
                            {element.tags.map(() => (
                              <IonThumbnail slot="start">
                                <IonSkeletonText
                                  animated={true}
                                  style={{ width: "80%" }}
                                ></IonSkeletonText>
                              </IonThumbnail>
                            ))}
                          </div>
                          <IonSkeletonText
                            animated={true}
                            style={{ width: "100%" }}
                          ></IonSkeletonText>
                        </div>
                      </IonCard>
                    );
                  })}
              </>
            ) : (
              <>
                <div className="noBooks">
                  <img
                    src="https://i.pinimg.com/originals/4c/6c/69/4c6c693465e89a914c40ba485cc721b4.gif"
                    alt="Sorry"
                    width={"100px"}
                  />
                  <p>Currently there are no books available with this name.</p>
                </div>
              </>
            )}
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
