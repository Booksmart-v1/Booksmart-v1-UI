import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  IonTextarea,
  IonTitle,
  IonFooter,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonLabel,
  IonPopover,
  IonToast,
} from "@ionic/react";
import "./Chat.css";
// import profile from "../images/profile-image.jpg";
import {
  arrowBackOutline,
  addCircle,
  ellipsisVertical,
  send,
} from "ionicons/icons";
import React, { useState, useEffect } from "react";

import "./Chat.css";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "stream-chat-react/dist/css/index.css";
// import { APIURL } from "../constants";
// import axios from "axios";
import socket from "../Socket";
import { APIURL } from "../constants";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface prop {
  setShowModal: any;
  bookAuthor: string;
  bookCondition: any;
  bookDescription: any;
  bookId: string;
  bookImageUrl: any;
  bookName: any;
  bookPrice: any;
  sellerAddress: String;
  sellerName: String;
  sold: String;
}

const HomeModal: React.FC<prop> = ({
  setShowModal,
  bookAuthor,
  bookCondition,
  bookDescription,
  bookId,
  bookImageUrl,
  bookName,
  bookPrice,
  sellerAddress,
  sellerName,
  sold,
}) => {
  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  const [userPic, setUserPic] = useState<string>(defaultProfileImg);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ minHeight: "7vh" }}>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Montserrat-B",
              color: "var(--bs-pText)",
              fontSize: "20px",
              marginLeft: "50px",
            }}
          >
            {bookName.length < 30
              ? bookName.toUpperCase()
              : bookName.substring(0, 30) + "..."}
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
            // borderRadius: "5px",
            // padding: "15px",
            backgroundImage: `url(${bookImageUrl})`,
            // backgroundImage: `url(${"https://material.angular.io/assets/img/examples/shiba1.jpg"})`,
          }}
        ></div>
      </IonHeader>
    </IonPage>
  );
};

export default HomeModal;
