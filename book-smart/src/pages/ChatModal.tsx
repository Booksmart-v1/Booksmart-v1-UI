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
  IonItem,
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
// import { match } from "react-router-dom";

interface chat {
  name: string;
  message: string;
  messages: any[];
  roomId: string;
  time: string;
  date: string;
  closed: boolean;
}

interface prop {
  chatRoomId: string;
  item: chat;
  setShowChatModal: any;
  text: string;
  setText: any;
  postMessage: any;
  userId: string;
  getChatRoomMessages: any;
}

const ChatModal: React.FC<prop> = ({
  chatRoomId,
  item,
  setShowChatModal,
  text,
  setText,
  postMessage,
  userId,
  getChatRoomMessages,
}) => {
  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  const [chatOpen, setChatOpen] = useState(!item.closed);
  const [chat, setChat] = useState<any>(item);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getChatRoomMessages(chatRoomId, chat);
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  const markAsSold = async (id: String) => {
    try {
      const url = APIURL + "v2/markAsSold";
      const resp = await axios.post(url, {
        id: id,
      });
      console.log(resp);
      const url1 = APIURL + "v2/closedChat";
      const resp1 = await axios.post(url, {
        chatRoomId: item.roomId,
        value: true,
      });
      console.log(resp1);
      setChatOpen(false);
      getChatRoomMessages(chatRoomId, chat);
    } catch (err) {
      console.log(err);
    }
  };
  const markAsUnSold = async (id: String) => {
    try {
      const url = APIURL + "v2/markAsUnsold";
      const resp = await axios.post(url, {
        id: id,
      });
      console.log(resp);
      const url1 = APIURL + "v2/closedChat";
      const resp1 = await axios.post(url, {
        chatRoomId: item.roomId,
        value: false,
      });
      console.log(resp1);
      setChatOpen(true);
      getChatRoomMessages(chatRoomId, chat);
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();
  useEffect(() => {
    console.log(chatRoomId);
    getChatRoomMessages(chatRoomId, chat);
    socket.on("get_message", (data: any) => {
      setChat((chat: any) => {
        let a = chat;
        a.messages = [...chat.messages, data];
        a.message = data;
        return a;
      });
      getChatRoomMessages(chatRoomId, chat);
      console.log(data);
    });
    console.log(chat);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: "10px 0" }}>
          <IonButtons slot="start">
            <IonButton
              routerLink="/homepage/Chat"
              onClick={() => {
                setShowChatModal(false);
              }}
            >
              <IonIcon icon={arrowBackOutline} color="dark"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={defaultProfileImg}
                alt="abc"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-B",
                  color: "var(--bs-pText)",
                  fontSize: "20px",
                  margin: "5px 0",
                }}
              >
                {item.name}
              </h2>
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                chatOpen ? markAsSold(item.roomId) : markAsUnSold(item.roomId);
              }}
            >
              <p>{chatOpen ? "Mark Sold" : "Mark Unsold"}</p>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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
          <p> Refreshing Your Chats!✌️</p>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {item.messages.map((item: any, idx: any) => {
          return (
            <div className="bubbleWrapper">
              <div
                className={`${
                  item.postedByUser === userId
                    ? "inlineContainer own"
                    : "inlineContainer"
                }`}
              >
                <img
                  className="inlineIcon"
                  alt="haha"
                  src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
                />
                <div
                  className={`${
                    item.postedByUser === userId
                      ? "ownBubble own"
                      : "otherBubble other"
                  }`}
                >
                  {item.message}
                </div>
              </div>
              <span
                className={`${item.postedByUser === userId ? "own" : "other"}`}
              >
                {item.createdAt.substring(11, 16)}
              </span>
            </div>
          );
        })}
      </IonContent>
      <IonFooter>
        <IonToolbar style={{ padding: "10px 0" }}>
          <IonButtons slot="start">
            <IonButton onClick={() => {}}>
              <IonIcon icon={addCircle} color="dark"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonItem style={{ borderRadius: "50px", border: "1px solid gray" }}>
            <IonTextarea
              style={{ fontFamily: "Montserrat-sb", maxHeight: "15px" }}
              autofocus={true}
              placeholder="Enter Message..."
              maxlength={150}
              value={text}
              disabled={!chatOpen}
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     postMessage();
              //   }
              // }}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  postMessage();
                }}
                disabled={!chatOpen}
              >
                <IonIcon icon={send} color="dark" size="small"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ChatModal;
