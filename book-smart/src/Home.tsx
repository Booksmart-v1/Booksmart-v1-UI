import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  home,
  peopleCircle,
  chatbubbles,
  bagCheck,
  personCircle,
} from "ionicons/icons";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import ChatModal from "./pages/ChatModal";
import axios from "axios";
import { APIURL } from "./constants";
import socket from "./Socket";

setupIonicReact();

interface myProps {
  refreshPage: any;
}
interface MatchParams {
  chatRoomId: string;
}

interface prop extends RouteComponentProps<MatchParams> {}

const Home: React.FC<myProps> = ({ refreshPage }) => {
  // let socket = io.connect("http://localhost:4000");
  // let {page} = useParams();
  var selectArray: boolean[] = [true, false, false, false, false];
  const [refresh, setRefresh] = React.useState(false);

  const [isSelected, setIsSelected] = React.useState<boolean[]>(selectArray);
  const handleSelect = (id: number) => {
    setIsSelected((prevState) =>
      prevState.map((item, idx) => (idx === id ? true : false))
    );
  };

  const a: any[] = [];
  const chatArray = [
    {
      name: "",
      message: "",
      messages: a,
      roomId: "",
      time: "",
      date: "",
    },
    {
      name: "",
      message: "",
      messages: a,
      roomId: "",
      time: "",
      date: "",
    },
  ];
  const [chatModal, setChatModal] = useState(chatArray[0]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [filterChats, setFilterChats] = React.useState(chatArray);
  const [chats, setChats] = useState(chatArray);
  // const [selIndex, SetSelIndex] = useState(0);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  const getChatRoomMessages = async (id1: string, chats: any) => {
    let url = APIURL + "v2/getMessagesInChatRoom";

    await axios
      .get(url + `?chatRoomId=${id1}`)
      .then(async (resp) => {
        socket.emit("join_room", id1);
        socket.on("get_message", (data: any) => {
          setChats((chats) => [...chats, data]);
          setFilterChats((chats) => [...chats, data]);
          console.log(data);
        });

        console.log(resp);
        const lastMsg = resp.data.data[resp.data.data.length - 1]
          ? resp.data.data[resp.data.data.length - 1].message
          : "Say hello to your new friend!";

        const time = resp.data.data[resp.data.data.length - 1]
          ? resp.data.data[resp.data.data.length - 1].createdAt.substring(
              11,
              16
            )
          : "Say hello to your new friend!";

        const date = resp.data.data[resp.data.data.length - 1]
          ? resp.data.data[resp.data.data.length - 1].createdAt.substring(0, 10)
          : "Say hello to your new friend!";

        let chatInfo = {
          name: chats.name,
          message: lastMsg,
          messages: resp.data.data,
          roomId: id1,
          time: time,
          date: date,
        };

        console.log(chatInfo);
        // return chatInfo;
        setChatModal(chatInfo);
        // console.log(chatInfo.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

              const ids = resp["data"]["data"]["chatRoomIds"];
              url = APIURL + "v2/getMessagesInChatRoom";
              for (let id in ids) {
                let id1 = ids[id];
                await axios
                  .get(url + `?chatRoomId=${id1}`)
                  .then(async (resp) => {
                    socket.emit("join_room", id1);
                    socket.on("get_message", (data: any) => {
                      setChats((chats) => [...chats, data]);
                      setFilterChats((chats) => [...chats, data]);
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
                      : "00:00";

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
              }
            })

            .catch((e) => {
              console.log(e);
            });
          console.log(chatInfo);
          setChats(chatInfo);
          setFilterChats(chatInfo);
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

  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet ionPage>
              <Route exact={true} path="/homepage" component={HomePage}></Route>
              <Route
                exact={true}
                path="/homepage/search"
                component={Search}
              ></Route>
              <Route exact={true} path="/homepage/Chat">
                <Chat
                  chats={chats}
                  setChats={setChats}
                  setFilterChats={setFilterChats}
                  filterChats={filterChats}
                  chatModal={chatModal}
                  setChatModal={setChatModal}
                  showChatModal={showChatModal}
                  setShowChatModal={setShowChatModal}
                  text={text}
                  setText={setText}
                  userId={userId}
                  setUserId={setUserId}
                  postMessage={postMessage}
                  getChatRooms={getChatRooms}
                />
              </Route>
              <Route
                path="/homepage/Chat/:chatRoomId"
                render={({ match }: prop) => {
                  return (
                    <ChatModal
                      chatRoomId={match.params.chatRoomId}
                      item={chatModal}
                      setShowChatModal={setShowChatModal}
                      text={text}
                      setText={setText}
                      postMessage={postMessage}
                      userId={userId}
                      getChatRoomMessages={getChatRoomMessages}
                    />
                  );
                }}
              ></Route>
              <Route
                exact={true}
                path="/homepage/sell"
                component={Sell}
              ></Route>
              <Route
                exact={true}
                path="/homepage/profile"
                component={Profile}
              ></Route>
              {/* <Route exact={true} path="/homepage/shop"
          component={Sell}
          >
            <Sell />
          </Route> */}
            </IonRouterOutlet>
            {/* Tabs at the bottom are handled over here */}
            <IonTabBar
              slot="bottom"
              style={{
                backgroundColor: "#f5f5f5",
                borderTop: "1px solid #e0e0e0",
                borderBottom: "1px solid #e0e0e0",
                borderRight: "1px solid #e0e0e0",
                borderLeft: "1px solid #e0e0e0",
                borderRadius: "0px 0px 0px 0px",
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
                height: "50px",
              }}
              // onClick={refreshPage}
            >
              <IonTabButton
                tab="homePage"
                href="/homepage"
                selected={isSelected[0]}
              >
                <IonIcon
                  icon={home}
                  onClick={() => handleSelect(0)}
                  color={"var(--bs-pText)"}
                />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="search"
                href="/homepage/Search"
                selected={isSelected[1]}
              >
                <IonIcon
                  icon={bagCheck}
                  onClick={() => handleSelect(1)}
                  color={"var(--bs-pText)"}
                />
                <IonLabel>Wishlist</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="chat"
                href="/homepage/Chat"
                selected={isSelected[2]}
              >
                <IonIcon
                  icon={chatbubbles}
                  onClick={() => handleSelect(2)}
                  color={"var(--bs-pText)"}
                />
                <IonLabel>Chat</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="sell"
                href="/homepage/Sell"
                selected={isSelected[3]}
              >
                <IonIcon
                  icon={peopleCircle}
                  onClick={() => handleSelect(3)}
                  color={"var(--bs-pText)"}
                />
                <IonLabel>Sell</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="profile"
                href="/homepage/Profile"
                selected={isSelected[4]}
              >
                <IonIcon
                  icon={personCircle}
                  onClick={() => handleSelect(4)}
                  color={"var(--bs-pText)"}
                />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
              {/* <IonTabButton
                tab="shop"
                href="/homepage/Shop"
                onClick={refreshPage}
              >
                <IonIcon icon={cartOutline} />
                <IonLabel>Shop</IonLabel>
              </IonTabButton> */}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  );
};

export default Home;
