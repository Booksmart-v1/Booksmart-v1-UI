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
} from "@ionic/react";
import { chevronForwardOutline, closeCircle, pin, chevronBackOutline, addCircle, search } from "ionicons/icons";
import React, { useState } from "react";
import "./search.css";
import catLogo from "../images/logo.png"


const Search: React.FC = () => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Health", hide: false },
    { key: 1, label: "Love", hide: false },
    { key: 2, label: "Horror", hide: false },
    { key: 3, label: "Fiction", hide: false },
  ]);
  const slideOpts = {
    initialSlide: 1.2,
    speed: 400,
  };
  const [searchQuery, setSearchQuery] = React.useState("");
  const [screen, setScreen] = React.useState("choose");
  const [refresh, setRefresh] = React.useState(false);

  const [showSearchModal, setShowSearchModal] = useState(false);

  const hideRecent = (i: number) => {
    let chips = chipData;
    chips[i].hide = true;
    console.log("Removed:", chips[i]);
    setChipData(chips);
    setRefresh(!refresh);
  };

  // Trending Books Modal
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddBookToast, setShowAddBookToast] = useState(false);

  function handleCategoryChange(e: any) {
    setSelectedCategory(e.target.value);
  }
  var defaultBooks = [
    { name: "The Alchemist", category: "Fiction", price: 99, booksCount: 0 },
    { name: "Dracula", category: "Horror", price: 149, booksCount: 0 },
    { name: "The Proposal", category: "Love", price: 199, booksCount: 0 },
    { name: "Atomic Habits", category: "Health", price: 49, booksCount: 0 },
  ]

  var categoryValues = [
    { value: "All" },
    { value: "Horror" },
    { value: "Fiction" },
    { value: "Love" },
    { value: "Health" },
  ]

  if (selectedCategory === "" || selectedCategory === "All") { var filteredList = defaultBooks }
  else { filteredList = defaultBooks.filter((item) => item.category === selectedCategory); }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <br />
          <IonTitle
            style={{
              color: "var(--bs-pText)",
              textAlign: "center",
              fontSize: "20px",
              fontFamily: "Montserrat-B",
            }}
          >
            SEARCH
          </IonTitle>
          <br />
          <IonSearchbar
            style={{ color: "var(--bs-sBg)" }}
            showCancelButton="focus"
            placeholder="Title, author or ISBN"
            onClick={() => setScreen("search")}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol size="8">
            <p className="text-align-left recent">Recent</p>
            <IonItemDivider></IonItemDivider>
          </IonCol>
          <IonCol size="4">
            <p
              className="text-align-right"
              style={{
                marginLeft: "30px",
                marginTop: "10px",
                color: "grey",
                fontSize: "16px",
              }}
              onClick={() => {
                setChipData((chips) =>
                  chips.map((chip) => {
                    chip.hide = true;
                    // localStorage.removeItem(chips[i].label);
                    return chip;
                  })
                );
              }}
            >
              Clear All
            </p>
          </IonCol>
        </IonRow>
        <div className="searched-chips">
          {chipData.map((chip, i) =>
            chip.hide ? (
              <></>
            ) : (
              <IonChip
                className="searched-items"
                key={i}
                outline
                color="primary"
              >
                <IonIcon icon={pin} />
                <IonLabel style={{ padding: "6px" }}>{chip.label}</IonLabel>
                <IonIcon
                  style={{ height: "20px" }}
                  onClick={() => hideRecent(i)}
                  icon={closeCircle}
                />
              </IonChip>
            )
          )}
        </div>
        <IonRow style={{ marginTop: "20px" }}>
          <IonCol size="8">
            <p className="text-align-left recent">Trending Books</p>
            <IonItemDivider></IonItemDivider>
          </IonCol>
          <IonCol size="4">
            <IonRow>
              <button
                className="text-align-right"
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                  color: "#002D62",
                  fontFamily: "Montserrat-SB",
                  fontSize: "16px",
                  backgroundColor: "transparent"
                }}
                onClick={() => {
                  setShowSearchModal(true);
                }}
              >
                View All
              </button>
              <span style={{ marginTop: "13px" }}>
                <IonIcon
                  style={{ backgroundColor: "lightgrey", borderRadius: "15px" }}
                  icon={chevronForwardOutline}
                ></IonIcon>
              </span>
            </IonRow>
          </IonCol>
        </IonRow>


        {/* View All Modal */}
        <IonModal isOpen={showSearchModal}>
          <IonHeader>
            <IonToolbar style={{ padding: "10px" }}>
              <IonTitle>
                <h2 style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "20px" }}>Trending Books</h2>
              </IonTitle>
              <IonButtons slot="start">
                <IonIcon style={{ backgroundColor: "light gray", borderRadius: "15px", marginLeft: "10px", fontSize: "20px" }} icon={chevronBackOutline} onClick={() => setShowSearchModal(false)}></IonIcon>
              </IonButtons>
              <IonButtons slot="end">
                <IonIcon icon={search} style={{ fontSize: "20px" }} />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className='search-area'>
              <div className='category-area'>
                {categoryValues.map((item) =>
                  <div style={{ textAlign: "center" }}>
                    <button className='category-btn' onClick={(e) => handleCategoryChange(e)} value={item.value} style={{ backgroundImage: `url(${catLogo})` }}></button>
                    <p>{item.value}</p>
                  </div>)}
              </div>
              <div className='trending-area'>
                <IonToast
                  isOpen={showAddBookToast}
                  onDidDismiss={() => setShowAddBookToast(false)}
                  message="Book added to cart."
                  duration={200}
                  position="top"
                />
                {filteredList.map((item, index) =>
                  <IonCard key={index} className="trend-card">
                    <h5 style={{ fontFamily: "Montserrat-B", fontSize: "15px", margin: "5px 0" }}>{item.name}</h5>
                    <img
                      alt="ex"
                      src="https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg="
                    ></img>
                    <p style={{ fontFamily: "Montserrat-SB", fontSize: "14px" }}>{item.category}</p>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", fontSize: "20px", fontFamily: "Monserrat-SB" }}>
                      <p>₹ {item.price}</p>
                      <IonIcon icon={addCircle} onClick={() => { setShowAddBookToast(true) }} />
                    </div>
                  </IonCard>
                )}
              </div>
            </div>
          </IonContent>
        </IonModal>


        <div className="cards">
          <IonSlides pager={true} options={slideOpts}>
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
              <br />
              <br />
              {/* <IonRow>
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
              </IonRow> */}
            </IonSlide>
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
    </IonPage>
  );
};

export default Search;
