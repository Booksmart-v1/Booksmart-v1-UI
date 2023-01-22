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
const ChatScreen = () => {
  // let a = localStorage.getItem("user");
  // console.log(a);
  // const trialUser = {
  //   id: "Taarushthenoob",
  //   name: "Taarush",
  //   email: "taarush.bhatia@gmail.com",
  //   // image: profile,
  // };
  // const [refresh, setRefresh] = React.useState(false);
  // const [channelId, setChannelId] = React.useState("messaging");
  // const [channelName, setChannelName] = React.useState("Booksmart");
  // const [channelRole, setChannelRole] = React.useState("admin");
  // // const [client, setClient] = React.useState(null);

  // // const [channel, setChannel] = React.useState(null);
  // // let channel = client.channel("messaging", "book-smart-app", {
  // //     image: "https://i.imgur.com/gwaMDJZ.png",
  // //     name: "BookSmart Chat",
  // //   });;
  // const [user, setUser] = React.useState(a == null ? trialUser : JSON.parse(a));
  // // let x= user;
  // // x.image = profile;
  // // setUser(x);
  // // setRefresh(!refresh);
  // // const [channel, setChannel] = React.useState(null);
  // // let chann: any;

  // let client = StreamChat.getInstance("unc9a4tjee5z");

  // // const apikey = localStorage.getItem("apiKey");

  // // console.log(localStorage.getItem("chatToken"));
  // client.connectUser(
  //   {
  //     id: user.name,
  //     name: user.name,
  //     email: user.email,
  //     image: user.image,
  //   },
  //   localStorage.getItem("chatToken")
  //     ? localStorage.getItem("chatToken")
  //     : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGl2aW5lLXN0YXItNiJ9.LcdM2p4JkRZH7YGCsUXXQZLKvUACudasFCMGqKW50ds"
  // );

  // // return client;

  // // initialiseClient(client);

  // const filter = {
  //   type: channelName,
  //   members: { $in: [user.name, "aagam2", "user"] },
  // };
  // const sort: any = { last_message_at: -1 }; // sort by latest message
  // const limit: any = 20;
  // client.queryChannels(filter, sort, {
  //   watch: true, // this is the default
  //   state: true,
  //   limit: 10,
  // });

  // const channel = client.channel(channelId, {
  //   // image: "https://i.imgur.com/gwaMDJZ.png",
  //   name: channelName,
  //   members: ["Taarush", "user", "aagam2"],
  //   role: channelRole,
  // });
  // channel.watch();

  // // console.log(client, "\n", channel);

  // // initialiseChannel(channel);

  // // const initChat = async () => {
  // //   console.log(user);
  // //   console.log(client);
  // // };

  // //  const client = new StreamChat(apikey == null ? "book-smart-app" : apikey);

  // // userId, name, userName, image, mobile, email, members;
  // React.useEffect(() => {
  //   let url: string = APIURL + "v2/addChannel";
  //   axios
  //     .post(url, {
  //       userId: user.name,
  //       name: channelName,
  //       userName: user.name,
  //       image: "",
  //       mobile: "",
  //       email: user.email,
  //       members: [user.name, "user", "Taarush"],
  //       role: channelRole,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         console.log(res.data.data.channelId);
  //         setChannelRole(res.data.data.role);
  //         console.log(channelId);
  //         setChannelName(res.data.data.name);
  //         // setMsg2(res.data.message);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       console.log(channelName);
  //       console.log(channelRole);
  //     });

  //   // initialiseClient(client);
  //   // initialiseChannel(channel);
  //   console.log(client, "\n", channel);
  // }, []);
  // const CustomInput = () => {
  //   // consume `MessageInputContext` and render custom component here
  // };

  const defaultProfileImg =
    "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  const chatArray = [
    {
      name: "Jonathan Perry",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, assumenda.",
      messages: [],
      roomId: "123",
      time: "17:06",
      date: "2023-01-22"
    },
    {
      name: "Joseph Burns",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, assumenda.",
      messages: [],
      roomId: "123",
      time: "17:06",
      date: "2023-01-22"
    },
    
  ];
  const [chatModal, setChatModal] = useState(chatArray[0]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chats, setChats] = useState(chatArray);
  // const [selIndex, SetSelIndex] = useState(0);
  const [text, setText] = useState("");

  const getChatRooms = async () => {
    var userId = "";
    var username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
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
                .then((resp) => {
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
                .then((resp) => {
                  console.log(resp);
                  const lastMsg = resp.data.data[resp.data.data.length-1]
                    ? resp.data.data[resp.data.data.length-1].message
                    : "Say hello to your new friend!";

                  const time = resp.data.data[resp.data.data.length-1]
                  ? resp.data.data[resp.data.data.length-1].createdAt.substring(11,16)
                    : "Say hello to your new friend!";

                  const date = resp.data.data[resp.data.data.length-1]
                    ? resp.data.data[resp.data.data.length-1].createdAt.substring(0,10)
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

    await axios.post(url,{
      chatRoomId: chatModal.roomId,
      message: text,
      postedByUser: userId,

    }).then((res)=>{
      console.log(res);
      if(res.data.success){
        setText("");
      }
    }).catch((e)=>{
      console.log(e);
    });

  }

  useEffect(() => {
    setInterval(async () => {
      await getChatRooms();
      console.log(chats);
    }, 10000);
  }, []);

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
                    <span style={{ color: "var(--bs-sText)" }}>{item.time}</span>
                  </div>
                </div>
              </IonItem>
            </>
          ))}
        </div>
      </IonContent>
      <IonModal isOpen={showChatModal}>
        <IonHeader>
          <IonToolbar style={{ padding: "10px 0" }}>
            <IonButtons slot="start">
              <IonButton
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
                  {chatModal.name}
                </h2>
              </div>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => {}}>
                <IonIcon icon={ellipsisVertical} color="dark"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"></IonContent>
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
                value={text} onIonChange={e => setText(e.detail.value!)}
              ></IonTextarea>
              <IonButtons slot="end">
                <IonButton onClick={() => {
                  postMessage();
                }}>
                  <IonIcon icon={send} color="dark" size="small"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default ChatScreen;
