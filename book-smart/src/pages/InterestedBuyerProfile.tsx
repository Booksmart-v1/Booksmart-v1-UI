import {
  IonButton,
  IonPopover,
  IonButtons,
  IonActionSheet,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonToolbar,
  IonItem,
  IonLabel,
  IonTextarea,
  IonModal,
  IonTitle,
  IonInput,
  IonFooter,
  IonToggle,
  IonToast,
  IonAccordionGroup,
  IonAccordion,
  IonBadge,
  IonAvatar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  useIonAlert,
} from "@ionic/react";
import "./Profile.css";
import { RefresherEventDetail } from "@ionic/core";
import profile from "../images/profile-image.jpg";
import {
  chatboxEllipsesOutline,
  chatboxOutline,
  createOutline,
  caretForwardCircle,
  share,
  trash,
  heart,
  logOutOutline,
  checkmarkOutline,
  closeOutline,
  settingsOutline,
  notificationsOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { APIURL } from "../constants";
import axios from "axios";
import { useHistory } from "react-router";
import moment from "moment";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
const InterestedBuyerProfile = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <IonPage className="ios">
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              fontFamily: "Montserrat-B",
              textAlign: "center",
              fontSize: "20px",
              marginLeft: "20px",
              color: "var(--bs-pText)",
            }}
          >
            Profile
          </div>
          <div></div>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className="profileHeader">
                <IonCardContent>
                  <IonRow>
                    <IonCol size="6">
                      <img
                        // src={profileChange.profilePicUrl}
                        alt="avatar"
                        style={{
                          borderRadius: "50%",
                          height: "15vh",
                        }}
                      />
                      <IonIcon
                        // onClick={() => setShowActionSheet(true)}
                        // onClick={() => getImage()}
                        icon={createOutline}
                        className="set-status"
                        color="dark"
                      ></IonIcon>
                    </IonCol>
                    <IonCol size="6">
                      <IonRow className="profileInfo">
                        <IonCol size="12">
                          <IonText color="dark" className="profileName">
                            <p>Name</p>
                          </IonText>
                          <IonText color="medium">
                            <p>Status</p>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default InterestedBuyerProfile;
