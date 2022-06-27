import {
  IonCard,
  IonCardContent,
  IonItemDivider,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  IonButton,
} from "@ionic/react";
import { chevronForwardOutline, closeCircle, pin } from "ionicons/icons";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./search.css";

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

  const hideRecent = (i: number) => {
    let chips = chipData;
    chips[i].hide = true;
    console.log("Removed:", chips[i]);
    setChipData(chips);
    setRefresh(!refresh);
  };

  //  const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  // };

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
              <p
                className="text-align-right"
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                  color: "#002D62",
                  fontFamily: "Montserrat-SB",
                  fontSize: "16px",
                }}
              >
                View All
              </p>
              <span style={{ marginTop: "11px", marginLeft: "3px" }}>
                <IonIcon
                  style={{ backgroundColor: "lightgrey", borderRadius: "15px" }}
                  icon={chevronForwardOutline}
                ></IonIcon>
              </span>
            </IonRow>
          </IonCol>
        </IonRow>
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
