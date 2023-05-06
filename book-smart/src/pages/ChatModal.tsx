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
// import { match } from "react-router-dom";

interface chat {
  name: string;
  profilePic: string;
  message: string;
  messages: any[];
  roomId: string;
  time: string;
  date: string;
  closed: boolean;
  bookAdId: string | undefined;
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
  getBookAds: any;
  setBookData: any;
  bookData: any;
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
  getBookAds,
  setBookData,
  bookData,
  // setBookdata,
  // bookData,
}) => {
  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  const [userPic, setUserPic] = useState<string>(defaultProfileImg);
  const [chatOpen, setChatOpen] = useState(!item.closed);
  const [chat, setChat] = useState<any>(item);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [toast, setToast] = useState(false);
  const [msg, setMsg] = useState("");
  const [ad, setAd] = useState<any>({});
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getChatRoomMessages(chatRoomId, item);
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  const markAsSold = async (id: string | undefined) => {
    try {
      const url = APIURL + "v2/markAsSold";
      const resp = await axios.post(url, {
        id: id,
      });
      console.log(resp);
      if (resp.data.success === true) {
        setMsg(resp.data.message);
        setToast(true);
      } else {
        return;
      }
      const url1 = APIURL + "v2/closedChat";
      const resp1 = await axios.post(url1, {
        chatRoomId: item.roomId,
        value: true,
      });
      console.log(resp1);
      setChatOpen(false);
      getChatRoomMessages(chatRoomId, item);
    } catch (err) {
      console.log(err);
    }
  };
  const markAsUnSold = async (id: string | undefined) => {
    try {
      const url = APIURL + "v2/markAsUnsold";
      const resp = await axios.post(url, {
        id: id,
      });
      if (resp.data.success === true) {
        setMsg(resp.data.message);
        setToast(true);
      } else {
        return;
      }
      console.log(resp);
      const url1 = APIURL + "v2/closedChat";
      const resp1 = await axios.post(url1, {
        chatRoomId: item.roomId,
        value: false,
      });
      console.log(resp1);
      setChatOpen(true);
      getChatRoomMessages(chatRoomId, item);
    } catch (err) {
      console.log(err);
    }
  };

  const getBookAd = async () => {
    let userId = "1233";
    let username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    let url = APIURL + "v2/getBookAd";

    await axios
      .get(url + `?id=${item.bookAdId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          var data = res.data.data;
          console.log(data);
          setAd(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const history = useHistory();
  useEffect(() => {
    console.log(chatRoomId);
    getChatRoomMessages(chatRoomId, item);
    getBookAd();
    socket.on("get_message", (data: any) => {
      setChat((chat: any) => {
        let a = chat;
        a.messages = [...chat.messages, data];
        a.message = data;
        return a;
      });
      getChatRoomMessages(chatRoomId, item);
      getBookAd();
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
                src={item.profilePic ? item.profilePic : defaultProfileImg}
                alt="abc"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "7px",
                }}
              />
              <h4
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-B",
                  color: "var(--bs-pText)",
                  fontSize: "10px",
                  // marginRight: "20px",
                }}
              >
                {item.name}
                <p>{ad.bookAuthor}</p>
              </h4>
            </div>
          </IonTitle>

          <IonButtons className="popover-ellipse" slot="end">
            <IonButton
              slot="end"
              // -id="right-end"
              onClick={() => {
                setShowPopover({
                  showPopover: true,
                  event: undefined,
                });
              }}
            >
              <IonIcon icon={ellipsisVertical} color="dark"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonPopover
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({
                showPopover: false,
                event: undefined,
              })
            }
          >
            <IonContent className="popover-size">
              <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={msg}
                duration={3000}
              />
              <IonItem
                button
                disabled={!chatOpen}
                onClick={() => {
                  markAsSold(item.bookAdId);
                  setShowPopover({
                    showPopover: false,
                    event: undefined,
                  });
                }}
              >
                <IonLabel className="profile-orders"> Mark Ad as sold</IonLabel>
              </IonItem>
              <IonItem
                button
                disabled={chatOpen}
                onClick={() => {
                  markAsUnSold(item.bookAdId);
                  setShowPopover({
                    showPopover: false,
                    event: undefined,
                  });
                }}
              >
                <IonLabel className="profile-orders">
                  {" "}
                  Mark Ad As Unsold
                </IonLabel>
              </IonItem>
            </IonContent>
          </IonPopover>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page">
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
        <div className="convo-body">
          {item.messages.map((item: any, idx: any) => {
            return (
              <>
                <div className="bubbleWrapper">
                  <div className="conversation">
                    <div className="conversation-container">
                      <div
                        className={`${
                          item.postedByUser === userId
                            ? "message sent"
                            : "message received"
                        }`}
                      >
                        {item.message}
                        <span className="metadata">
                          <span className="time">
                            {" "}
                            {item.createdAt.substring(11, 16)}
                          </span>
                          <span className="tick">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="15"
                              id="msg-dblcheck-ack"
                              x="2063"
                              y="2076"
                            >
                              <path
                                d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                                fill="#4fc3f7"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>

                      {/* <span
                        className={`${
                          item.postedByUser === userId ? "own" : "other"
                        }`}
                      >
                        {item.createdAt.substring(11, 16)}
                      </span> */}
                    </div>
                    {/* <div
                  className={`${
                    item.postedByUser === userId
                      ? "imessage"
                      : "otherBubble other"
                  }`}
                >
                  <p> {item.message}</p>
                </div> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
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
