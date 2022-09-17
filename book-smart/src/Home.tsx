import React, { Profiler, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonViewWillEnter,
  //   setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useParams } from "react-router";
import {
  ellipse,
  square,
  triangle,
  home,
  search,
  peopleCircle,
  chatbubbles,
  bagCheck,
  cartOutline,
  personCircle,
  bookOutline,
  chatbubbleEllipses,
} from "ionicons/icons";
import HomePage from "./pages/HomePage";
import Onboard from "./pages/login/Onboard";
import PickInterests from "./pages/login/PickInterests";
import Search from "./pages/Search";
import Sell from "./pages/Sell";
// import home from "./images/home.png";
// import search from "./images/search.png";
import wishlist from "./images/wishlist.png";
import profile from "./images/profile.png";
import cart from "./images/cart.png";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

setupIonicReact();

interface myProps {
  refreshPage: any;
}

const Home: React.FC<myProps> = ({ refreshPage }) => {
  // let {page} = useParams();
  var selectArray: boolean[] = [true, false, false, false, false];
  const [refresh, setRefresh] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState<boolean[]>(selectArray);
  const handleSelect = (id: number) => {
    setIsSelected(prevState => prevState.map((item, idx) => idx === id ? true : false));
  }

  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet ionPage>
              <Route exact={true} path="/homepage" component={HomePage}></Route>
              <Route exact={true} path="/homepage/search" component={Search}
              ></Route>
              <Route exact={true} path="/homepage/Chat" component={Chat}
              ></Route>
              <Route exact={true} path="/homepage/sell" component={Sell}
              ></Route>
              <Route exact={true} path="/homepage/profile" component={Profile}
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
              <IonTabButton tab="homePage" href="/homepage" selected={isSelected[0]}>
                <IonIcon icon={home} onClick={() => handleSelect(0)} color={"var(--bs-pText)"} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="search" href="/homepage/Search" selected={isSelected[1]}>
                <IonIcon icon={bagCheck} onClick={() => handleSelect(1)} color={"var(--bs-pText)"} />
                <IonLabel>Wishlist</IonLabel>
              </IonTabButton>

              <IonTabButton tab="chat" href="/homepage/Chat" selected={isSelected[2]}>
                <IonIcon icon={chatbubbles} onClick={() => handleSelect(2)} color={"var(--bs-pText)"} />
                <IonLabel>Chat</IonLabel>
              </IonTabButton>
              <IonTabButton tab="sell" href="/homepage/Sell" selected={isSelected[3]}>
                <IonIcon icon={peopleCircle} onClick={() => handleSelect(3)} color={"var(--bs-pText)"} />
                <IonLabel>Sell</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/homepage/Profile" selected={isSelected[4]}>
                <IonIcon icon={personCircle} onClick={() => handleSelect(4)} color={"var(--bs-pText)"} />
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
