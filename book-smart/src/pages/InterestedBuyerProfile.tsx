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
    <IonPage className="md">
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
    </IonPage>
  );
};

export default InterestedBuyerProfile;
