import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonText,
  IonRow,
  IonCol,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonFooter,
  IonRippleEffect,
  IonToast,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./pickInterests.css";
import logo from "../../images/history.jpg";
import { useHistory } from "react-router";
import { informationCircle } from "ionicons/icons";

const interests = [
  {
    id: 0,
    name: "history",
    src: logo,
  },
  {
    id: 1,
    name: "history",
    src: logo,
  },
  {
    id: 2,
    name: "history",
    src: logo,
  },
  {
    id: 3,
    name: "history",
    src: logo,
  },
  {
    id: 4,
    name: "history",
    src: logo,
  },
  {
    id: 5,
    name: "history",
    src: logo,
  },
];

//   export interface Interest {
//   name: string;
//   src: string;
// }
const vals: boolean[] = [false, false, false, false, false, false];

const PickInterests: React.FC = () => {
  const history = useHistory();
  const [pickedInterests, setPickedInterests] = React.useState<boolean[]>(vals);
  const [showToast1, setShowToast1] = React.useState(false);

  // 1. const [cards, setCards] = React.useState<boolean[]>(vals);
  const [checkBoxState, setcheckBoxState] = useState(vals)

  const toggleSelection = (id: number) => {
    var val = pickedInterests;
    val[id] ? (val[id] = false) : (val[id] = true)
    setPickedInterests(val);
    setcheckBoxState(prevState => prevState.map((item, idx) => idx === id ? !item : item));
  };

  const handleClick = () => {
    var val = pickedInterests;
    var c = 0, i = 0;
    for (i = 0; i < interests.length; i++) {
      if (val[i]) c++;
    }
    if (c >= 3) {
      console.log("go to homepage");
      history.push("/homepage");
    } else {
      setShowToast1(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="pi-toolbar">
          <IonText>
            <h1>Pick Your Interests</h1>
            <h3>(Minimum 3)</h3>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ height: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", padding: "10px" }}>
          <IonRow>
            <IonCol className={checkBoxState[0] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[0].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[0].name}
                src={interests[0].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
            <IonCol className={checkBoxState[1] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[1].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[1].name}
                src={interests[1].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className={checkBoxState[2] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[2].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[2].name}
                src={interests[2].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
            <IonCol className={checkBoxState[3] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[3].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[3].name}
                src={interests[3].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className={checkBoxState[4] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[4].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[4].name}
                src={interests[4].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
            <IonCol className={checkBoxState[5] ? "pickInterestCard scale" : "pickInterestCard"} onClick={() => toggleSelection(interests[5].id)}>
              <p style={{ fontSize: "16px" }}>Text</p>
              <img
                alt={interests[5].name}
                src={interests[5].src}
                style={{ width: "50%", height: "120px" }}
              ></img>
            </IonCol>
          </IonRow>
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Less than 3 interests selected. Please select at least 3 to continue!"
        icon={informationCircle}
        translucent={true}
        mode="ios"
        duration={4000}
        position="top"
        buttons={[
          {
            text: "Hide",
            role: "cancel",
            handler: () => setShowToast1(false),
          },
        ]}
      />
      <button onClick={handleClick} className="long-cta">
        Select
      </button>
      <IonRippleEffect></IonRippleEffect>
    </IonPage>
  );
};

export default PickInterests;
