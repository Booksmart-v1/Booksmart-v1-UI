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
  IonText,
  IonToolbar,
  IonItem,
  IonLabel,
  IonTextarea,
  IonApp,
  IonAvatar,
  IonList,
  IonModal,
  IonTitle,
  IonFooter,
  IonInput,
  IonSearchbar,
} from "@ionic/react";
import "./Chat.css";
import profile from "../images/profile-image.jpg";
import {
  arrowBackOutline,
  addCircle,
  arrowForward,
  bookmarkOutline,
  chatboxEllipsesOutline,
  ellipsisHorizontal,
  ellipsisVertical,
  imageOutline,
  personAddOutline,
  chatboxOutline,
  createOutline,
  caretForwardCircle,
  share,
  trash,
  heart,
  image,
  send,
} from "ionicons/icons";
import React, { useState, Component, useEffect } from "react";
import { close } from "fs";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  MessageList,
  MessageInput,
  useChatContext,
  ChannelList,
  MessageOptions,
  QuotedMessagePreview,
  UploadsPreview,
  EmojiPicker,
  SendButton,
  useChannelTruncatedListener,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import "./Chat.css";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "stream-chat-react/dist/css/index.css";
import { APIURL } from "../constants";
import axios from "axios";
import ChatModal from "./ChatModal";
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
  } = props;

  // const [filteredInfo, setFilteredInfo] = useState(chats);
  const [searchName, setSearchName] = useState("");

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
                    <img src={defaultProfileImg} alt="abc" />
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
