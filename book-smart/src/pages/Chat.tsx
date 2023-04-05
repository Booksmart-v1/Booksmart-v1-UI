import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonToolbar,
  IonItem,
  IonSearchbar,
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import "./Chat.css";
import { ellipsisVertical } from "ionicons/icons";
import { useState, useEffect } from "react";

import "./Chat.css";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "stream-chat-react/dist/css/index.css";
// import * as io from "socket.io-client";
import socket from "../Socket";

// var socket = io.connect("http://localhost:4000");

const ChatScreen = (props: Record<string, any>) => {
  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";

  const {
    chats,
    setChats,
    chatModal,
    setChatModal,
    showChatModal,
    setShowChatModal,
    filterChats,
    setFilterChats,
    userId,
    setUserId,
    text,
    setText,
    postMessage,
    getChatRooms,
    getProfile,
  } = props;

  // const [filteredInfo, setFilteredInfo] = useState(chats);
  const [searchName, setSearchName] = useState("");

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getChatRooms(60);
    getProfile();
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }
  const handleSearchChat = (e: any) => {
    // setSearchBook(e.detail.value);
    const searchText = e.detail.value;
    console.log(searchText);
    setSearchName(searchText);
    if (searchText !== "") {
      const xyz = chats.filter((item: any) => {
        if (String(item.name.toLowerCase()).includes(searchText.toLowerCase()))
          return item;
      });
      setFilterChats(xyz);
    } else {
      setFilterChats(chats);
    }
  };

  useEffect(() => {
    getChatRooms(60);
    getProfile();
    console.log(chats);
  }, [socket]);
  return (
    <IonPage>
      <IonToolbar className="chat-header">
        <h2>Messages</h2>
        <IonButtons slot="end">
          <IonButton onClick={() => {}}>
            <IonIcon icon={ellipsisVertical} color="dark"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <div className="">
        <IonSearchbar
          animated={true}
          placeholder="Search for users ..."
          // value={searchBook}
          onIonChange={(e) => {
            handleSearchChat(e);
          }}
          showCancelButton="focus"
        ></IonSearchbar>
      </div>
      <IonContent>
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
        <div className="chat-area">
          {filterChats.map((item: any, idx: any) => (
            <>
              <IonItem
                lines="none"
                routerLink={`/homepage/Chat/${item.roomId}`}
                onClick={() => {
                  setChatModal(item);
                  setShowChatModal(true);
                }}
              >
                <div className="chat-card">
                  <div className="chat-card-img">
                    <img src={item.profilePic} alt="abc" />
                  </div>
                  <div className="chat-card-content">
                    <p style={{ fontFamily: "Montserrat-b", fontSize: "18px" }}>
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat-sb",
                        fontSize: "12px",
                        margin: "5px 0",
                      }}
                    >
                      <span style={{ color: "gray" }}>
                        {/* Lorem ipsum dolor sit, amet elit. Necessitatibus, minima. */}
                        {item.message}
                      </span>
                    </p>
                  </div>
                  <div className="chat-card-time">
                    <span style={{ color: "var(--bs-sText)" }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              </IonItem>
            </>
          ))}
        </div>
      </IonContent>
    </IonPage>
    // )
  );
};

export default ChatScreen;
