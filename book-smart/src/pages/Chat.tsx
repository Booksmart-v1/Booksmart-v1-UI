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
import * as io from "socket.io-client";

var socket = io.connect("http://localhost:4000");

const ChatScreen = () => {
  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";

  const a: any[] = [];
  const chatArray = [
    {
      name: "Jonathan Perry",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, assumenda.",
      messages: a,
      roomId: "123",
      time: "17:06",
      date: "2023-01-22",
    },
    {
      name: "Joseph Burns",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, assumenda.",
      messages: a,
      roomId: "123",
      time: "17:06",
      date: "2023-01-22",
    },
  ];
  const [chatModal, setChatModal] = useState(chatArray[0]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chats, setChats] = useState(chatArray);
  // const [selIndex, SetSelIndex] = useState(0);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  const getChatRooms = async () => {
    var userId = "";
    var username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    setUserId(userId);
    var url = APIURL + "v2/getOneUser";
    let chatUsers: any[] = [];
    await axios
      .get(url + `?userId=${userId}`)
      .then((resp) => {
        console.log(resp);
        chatUsers = resp.data.data.usersInContact;
        console.log(chatUsers);

        var url = APIURL + "v2/initiateChat";
        let chatInfo: any[] = [];

        chatUsers.forEach(async (id) => {
          console.log(id);
          await axios
            .post(url, {
              sellerId: userId,
              buyerId: id,
            })
            .then(async (resp) => {
              console.log(resp);
              let name = "";

              var url = APIURL + "v2/getOneUser";

              await axios
                .get(url + `?userId=${id}`)
                .then(async (resp) => {
                  console.log(resp);
                  name = resp.data.data.name;
                  console.log(name);
                })
                .catch((e) => {
                  console.log(e);
                });

              const id1 = resp["data"]["data"]["chatRoomId"];
              console.log(id1);
              url = APIURL + "v2/getMessagesInChatRoom";

              await axios
                .get(url + `?chatRoomId=${id1}`)
                .then(async (resp) => {
                  socket.emit("join_room", id1);
                  socket.on("get_message", (data) => {
                    
                    console.log(data);
                  });

                  console.log(resp);
                  const lastMsg = resp.data.data[resp.data.data.length - 1]
                    ? resp.data.data[resp.data.data.length - 1].message
                    : "Say hello to your new friend!";

                  const time = resp.data.data[resp.data.data.length - 1]
                    ? resp.data.data[
                        resp.data.data.length - 1
                      ].createdAt.substring(11, 16)
                    : "Say hello to your new friend!";

                  const date = resp.data.data[resp.data.data.length - 1]
                    ? resp.data.data[
                        resp.data.data.length - 1
                      ].createdAt.substring(0, 10)
                    : "Say hello to your new friend!";

                  chatInfo = [
                    ...chatInfo,
                    {
                      name: name,
                      message: lastMsg,
                      messages: resp.data.data,
                      roomId: id1,
                      time: time,
                      date: date,
                    },
                  ];
                  console.log(chatInfo);
                  console.log(chatInfo.length);
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
          console.log(chatInfo);
          setChats(chatInfo);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postMessage = async () => {
    var userId = "";
    var username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    var url = APIURL + "v2/postInChatRoom";

    await axios
      .post(url, {
        chatRoomId: chatModal.roomId,
        message: text,
        postedByUser: userId,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          socket.emit("send_message", res.config.data);
          console.log(res.config.data);
          // var a2 = JSON.parse(res.config.data)["message"];
          // console.log(a2);
          //  var a3 = { ...chatModal.messages };
          // setChatModal((list) => [...list, a2]);
          setText("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getChatRooms();
    console.log(chats);
  }, [socket]);

  return (
    // <IonPage className="ios">
    //   <Chat client={client} theme={"messaging dark"}>
    //     <Channel channel={channel}>
    //       <Window>
    //         <ChannelHeader />
    //         <MessageList />
    //         <div>{/* <EmojiPicker /> */}</div>;
    //         {/* <span className={`str-chat__message-${MessageInput}-status`} /> */}
    //         <MessageInput grow={true} mentionAllAppUsers />
    //         <MessageInput grow={true} mentionAllAppUsers />
    //       </Window>
    //       <Thread />
    //     </Channel>
    //   </Chat>
    // </IonPage>

    showChatModal ? (
      <ChatModal
        item={chatModal}
        setShowChatModal={setShowChatModal}
        text={text}
        setText={setText}
        postMessage={postMessage}
        userId={userId}
      />
    ) : (
      <IonPage>
        <IonToolbar className="chat-header">
          <h2>Messages</h2>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>
              <IonIcon icon={ellipsisVertical} color="dark"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <div className="chat-area">
            {chats.map((item, idx) => (
              <>
                <IonItem
                  lines="none"
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
                      <p
                        style={{ fontFamily: "Montserrat-b", fontSize: "18px" }}
                      >
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
    )
  );
};

export default ChatScreen;
