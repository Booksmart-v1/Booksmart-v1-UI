import React from "react";
import { IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonToolbar, IonIcon, IonRippleEffect, IonToast } from "@ionic/react";
import "./pickInterests.css";
import logo from "../../images/history.jpg";
import { useHistory } from "react-router";
import { informationCircle, checkmarkOutline } from "ionicons/icons";
import Rectangle1 from "../../images/Rectangle1.png"
import Rectangle2 from "../../images/Rectangle2.png"
import Rectangle3 from "../../images/Rectangle3.png"
import Rectangle4 from "../../images/Rectangle4.png"
import Rectangle5 from "../../images/Rectangle5.png"
import Rectangle6 from "../../images/Rectangle6.png"
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

var vals: boolean[] = [false, false, false, false, false, false];

const PickInterests: React.FC = () => {
  const history = useHistory();
  const [pickedInterests, setPickedInterests] = React.useState<boolean[]>(vals);
  const [showToast1, setShowToast1] = React.useState(false);

  const toggleSelection = (id: number) => {
    setPickedInterests(prevState => prevState.map((item, idx) => idx === id ? !item : item));
  };

  const handleClick = () => {
    let val = pickedInterests;
    var c = 0, i = 0;
    for (i = 0; i < interests.length; i++) {
      if (val[i]) c++;
    }
    if (c >= 3) {
      console.log("go to homepage");
      history.push("/homepage");
    }
    else {
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
            <IonCol style={{ background: `url(${Rectangle1})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[0] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[0].id)}>
              <div className={pickedInterests[0] ? "tick-box" : ""}>
                {pickedInterests[0] && <IonIcon icon={checkmarkOutline}></IonIcon>}
              </div>
            </IonCol>
            <IonCol style={{ background: `url(${Rectangle2})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[1] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[1].id)}>
              <div className={pickedInterests[1] ? "tick-box" : ""}>
                {pickedInterests[1] && <IonIcon icon={checkmarkOutline}></IonIcon>}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ background: `url(${Rectangle3})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[2] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[2].id)}>
              <div className={pickedInterests[2] ? "tick-box" : ""}>
                {pickedInterests[2] && <IonIcon icon={checkmarkOutline}></IonIcon>}
              </div>
            </IonCol>
            <IonCol style={{ background: `url(${Rectangle4})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[3] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[3].id)}>
              <div className={pickedInterests[3] ? "tick-box" : ""}>
                {pickedInterests[3] && <IonIcon icon={checkmarkOutline}></IonIcon>}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ background: `url(${Rectangle5})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[4] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[4].id)}>
              <div className={pickedInterests[4] ? "tick-box" : ""}>
                {pickedInterests[4] && <IonIcon icon={checkmarkOutline}></IonIcon>}
              </div>
            </IonCol>
            <IonCol style={{ background: `url(${Rectangle6})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}
              className={pickedInterests[5] ? "pickInterestCard scale" : "pickInterestCard"}
              onClick={() => toggleSelection(interests[5].id)}>
              <div className={pickedInterests[5] ? "tick-box" : ""}>
                {pickedInterests[5] && <IonIcon icon={checkmarkOutline} color="white"></IonIcon>}
              </div>
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
        Continue
      </button>
      <IonRippleEffect></IonRippleEffect>
    </IonPage>
  );
};

export default PickInterests;
