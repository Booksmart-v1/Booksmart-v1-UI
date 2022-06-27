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
} from "@ionic/react";
import "./Chat.css";
import profile from "../images/profile-image.jpg";
import {
  arrowBackOutline,
  arrowForward,
  bookmarkOutline,
  chatboxEllipsesOutline,
  ellipsisHorizontal,
  imageOutline,
  personAddOutline,
  chatboxOutline,
  createOutline,
  caretForwardCircle,
  share,
  trash,
  heart,
  image,
} from "ionicons/icons";
import React, { useState, Component } from "react";
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
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import "./Chat.css";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "stream-chat-react/dist/css/index.css";
import { APIURL } from "../constants";
import axios from "axios";

const ChatScreen = () => {
  let a = localStorage.getItem("user");
  console.log(a);
  const trialUser = {
    id: "Taarushthenoob",
    name: "Taarush",
    email: "taarush.bhatia@gmail.com",
    // image: profile,
  };
  const [refresh, setRefresh] = React.useState(false);
  const [channelId, setChannelId] = React.useState("messaging");
  const [channelName, setChannelName] = React.useState("Booksmart");
  const [channelRole, setChannelRole] = React.useState("admin");
  // const [client, setClient] = React.useState(null);

  // const [channel, setChannel] = React.useState(null);
  // let channel = client.channel("messaging", "book-smart-app", {
  //     image: "https://i.imgur.com/gwaMDJZ.png",
  //     name: "BookSmart Chat",
  //   });;
  const [user, setUser] = React.useState(a == null ? trialUser : JSON.parse(a));
  // let x= user;
  // x.image = profile;
  // setUser(x);
  // setRefresh(!refresh);
  // const [channel, setChannel] = React.useState(null);
  // let chann: any;

  let client = StreamChat.getInstance("unc9a4tjee5z");

  // const apikey = localStorage.getItem("apiKey");

  // console.log(localStorage.getItem("chatToken"));
  client.connectUser(
    {
      id: user.name,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    localStorage.getItem("chatToken")
      ? localStorage.getItem("chatToken")
      : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGl2aW5lLXN0YXItNiJ9.LcdM2p4JkRZH7YGCsUXXQZLKvUACudasFCMGqKW50ds"
  );

  // return client;

  // initialiseClient(client);

  const filter = {
    type: channelName,
    members: { $in: [user.name, "aagam2", "user"] },
  };
  const sort: any = { last_message_at: -1 }; // sort by latest message
  const limit: any = 20;
  client.queryChannels(filter, sort, {
    watch: true, // this is the default
    state: true,
    limit: 10,
  });

  const channel = client.channel(channelId, {
    // image: "https://i.imgur.com/gwaMDJZ.png",
    name: channelName,
    members: ["Taarush", "user", "aagam2"],
    role: channelRole,
  });
  channel.watch();

  // console.log(client, "\n", channel);

  // initialiseChannel(channel);

  // const initChat = async () => {
  //   console.log(user);
  //   console.log(client);
  // };

  //  const client = new StreamChat(apikey == null ? "book-smart-app" : apikey);

  // userId, name, userName, image, mobile, email, members;
  React.useEffect(() => {
    let url: string = APIURL + "v2/addChannel";
    axios
      .post(url, {
        userId: user.name,
        name: channelName,
        userName: user.name,
        image: "",
        mobile: "",
        email: user.email,
        members: [user.name, "user", "Taarush"],
        role: channelRole,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.data.channelId);
          setChannelRole(res.data.data.role);
          console.log(channelId);
          setChannelName(res.data.data.name);
          // setMsg2(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(channelName);
        console.log(channelRole);
      });

    // initialiseClient(client);
    // initialiseChannel(channel);
    console.log(client, "\n", channel);
  }, []);
  const CustomInput = () => {
    // consume `MessageInputContext` and render custom component here
  };
  return (
    <IonPage className="ios">
      <Chat client={client} theme={"messaging dark"}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <div>{/* <EmojiPicker /> */}</div>;
            {/* <span className={`str-chat__message-${MessageInput}-status`} /> */}
            <MessageInput grow={true} mentionAllAppUsers />
            <MessageInput grow={true} mentionAllAppUsers />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </IonPage>
  );
};

export default ChatScreen;
