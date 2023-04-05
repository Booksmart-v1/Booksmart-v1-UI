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
import "./Home.css";
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
      closed: false,
      bookAdId: "",
    },
    {
      name: "",
      message: "",
      messages: a,
      roomId: "",
      time: "",
      date: "",
      closed: false,
      bookAdId: "",
    },
  ];
  const [chatModal, setChatModal] = useState(chatArray[0]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [filterChats, setFilterChats] = React.useState(chatArray);
  const [chats, setChats] = useState(chatArray);
  const [profileChange, setProfileChange] = useState<any>({
    profilePicUrl: "",
  });
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

        let time = resp.data.data[resp.data.data.length - 1]
          ? resp.data.data[resp.data.data.length - 1].createdAt.substring(
              11,
              16
            )
          : "00:00";

        let hour = parseInt(time.substring(0, 2));
        let minutes = parseInt(time.substring(3, 5));
        minutes += 30;
        let c = minutes / 60;
        minutes %= 60;
        hour += (c + 5) % 24;
        time = hour + ":" + minutes;

        const date = resp.data.data[resp.data.data.length - 1]
          ? resp.data.data[resp.data.data.length - 1].createdAt.substring(0, 10)
          : "00/00";

        let chatInfo = {
          name: chats.name,
          message: lastMsg,
          messages: resp.data.data,
          roomId: id1,
          time: time,
          date: date,
          closed: chats.closed,
          bookAdId: chats.bookAdId,
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

              // let closed = resp.data.data.closed;
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
              const bbc: boolean[] = resp["data"]["data"]["closedRoomIds"];
              const bId: string[] = resp["data"]["data"]["bookAdIds"];

              url = APIURL + "v2/getMessagesInChatRoom";

              for (let i = 0; i < bbc.length; i++) {
                let id1 = ids[i];
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

                    let time = resp.data.data[resp.data.data.length - 1]
                      ? resp.data.data[
                          resp.data.data.length - 1
                        ].createdAt.substring(11, 16)
                      : "00:00";

                    let hour = parseInt(time.substring(0, 2));
                    let minutes = parseInt(time.substring(3, 5));
                    minutes += 30;
                    let c = Math.floor(minutes / 60);
                    minutes %= 60;
                    hour = (hour + c + 5) % 24;
                    time =
                      (hour / 10 >= 1 ? hour : "0" + hour) +
                      ":" +
                      (minutes / 10 >= 1 ? minutes : "0" + minutes);

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
                        closed: bbc[i],
                        bookAdId: bId[i],
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
          setText("");
          getChatRoomMessages(chatModal.roomId, chatModal);
          // var a2 = JSON.parse(res.config.data)["message"];
          // console.log(a2);
          //  var a3 = { ...chatModal.messages };
          // setChatModal((list) => [...list, a2]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getProfile = () => {
    let userId = "1233";
    let username = "Aagam";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    let url = APIURL + "v2/getUser";

    axios
      .get(url + `?id=${userId}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setProfileChange(res.data.data.profilePicUrl);
          //set profile details
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // url = APIURL + "v2/getMyBookAds";

    // axios
    //   .get(url + `?userId=${userId}&limit=${lim}`)
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       //set book details
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
                  getProfile={getProfile}
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
              style={
                {
                  // backgroundColor: "#f5f5f5",
                  // borderTop: "1px solid #e0e0e0",
                  // borderBottom: "1px solid #e0e0e0",
                  // borderRight: "1px solid #e0e0e0",
                  // borderLeft: "1px solid #e0e0e0",
                  // borderRadius: "0px 0px 0px 0px",
                  // boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)",
                  // height: "50px",
                }
              }
              className="tab-bar"
              // onClick={refreshPage}
            >
              <IonTabButton
                tab="homePage"
                href="/homepage"
                selected={isSelected[0]}
                layout="icon-top"
                className="tab-button"
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
                layout="icon-top"
                className="tab-button"
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
                layout="icon-top"
                className="tab-button"
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
                layout="icon-top"
                className="tab-button"
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
                layout="icon-top"
                className="tab-button"
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
