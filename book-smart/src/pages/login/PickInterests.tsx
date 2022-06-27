import React from "react";
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
  const [ints, setInts] = React.useState(interests);
  const [pickedInterests, setPickedInterests] = React.useState<boolean[]>(vals);
  const [showToast1, setShowToast1] = React.useState(false);

  const toggleSelection = (id: number) => {
    let val = pickedInterests;
    if (val[id]) val[id] = false;
    else val[id] = true;

    setPickedInterests(val);
  };

  const handleClick = () => {
    let val = pickedInterests;
    let c = 0,
      i = 0;
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
      <IonContent className="ion-no-padding">
        {/* <IonHeader>
          Pick your interests
        </IonHeader> */}
        <IonHeader>
          <IonToolbar className="pi-toolbar">
            <IonText>
              <h1>Pick Your Interests</h1>
              <h3>(Minimum 3)</h3>
            </IonText>
          </IonToolbar>
        </IonHeader>
        {/* <IonGrid className='grid'>
          <IonCard className='top-card'>
            <IonCardHeader>
              <IonCardTitle className='title'>Pick Your Interests</IonCardTitle>
              <IonCardSubtitle className='subtitle1'> (Select atleast 3)</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        </IonGrid> */}
        <div className="cards1">
          <IonRow>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[0].name}
                  onClick={() => toggleSelection(ints[0].id)}
                  className="pi-card"
                  src={ints[0].src}
                ></img>
              </IonCol>
            </IonGrid>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[1].name}
                  className="pi-card"
                  onClick={() => toggleSelection(ints[1].id)}
                  src={ints[1].src}
                ></img>
              </IonCol>
            </IonGrid>
          </IonRow>
          <IonRow>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[2].name}
                  onClick={() => toggleSelection(ints[2].id)}
                  className="pi-card"
                  src={ints[2].src}
                ></img>
              </IonCol>
            </IonGrid>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[3].name}
                  onClick={() => toggleSelection(ints[3].id)}
                  className="pi-card"
                  src={ints[3].src}
                ></img>
              </IonCol>
            </IonGrid>
          </IonRow>
          <IonRow>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[4].name}
                  onClick={() => toggleSelection(ints[4].id)}
                  className="pi-card"
                  src={ints[4].src}
                ></img>
              </IonCol>
            </IonGrid>
            <IonGrid>
              <IonCol className="col" size="6">
                <img
                  alt={ints[5].name}
                  onClick={() => toggleSelection(ints[5].id)}
                  className="pi-card"
                  src={ints[5].src}
                ></img>
              </IonCol>
            </IonGrid>
          </IonRow>
        </div>
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
            // {
            //   side: 'start',
            //   icon: 'star',
            //   text: 'Favorite',
            //   handler: () => {
            //     console.log('Favorite clicked');
            //   }
            // },
            {
              text: "Hide",
              role: "cancel",
              handler: () => setShowToast1(false),
            },
          ]}
        />
      </IonContent>
      <IonFooter className="ion-no-border">
        <button onClick={handleClick} className="long-cta">
          Select
        </button>
        <IonRippleEffect></IonRippleEffect>
      </IonFooter>
    </IonPage>
  );
};

export default PickInterests;
