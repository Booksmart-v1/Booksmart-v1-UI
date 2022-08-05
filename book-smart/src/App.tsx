import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonViewWillEnter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/HomePage";
import Tab2 from "./pages/Search";
import Tab3 from "./pages/Sell";
import Onboard from "./pages/login/Onboard";
import PickInterests from "./pages/login/PickInterests";
import Welcome from "./pages/login/Welcome";

import Home from "./Home";
import Login from "./Login";
import Logo from "./images/logo.png"
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Search from "./pages/Search";
import Sell from "./pages/Sell";
import OpeningPage from "./pages/OpeningPage";
import React, { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const refreshPage = () => {
    console.log(refresh);
    setRefresh(!refresh);
  };

  useIonViewWillEnter(() => {
    console.log("heyy");
  });

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false)
    }, 3000);
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet ionPage>
            <Route path="/homepage">
              <Home refreshPage={refreshPage} />
            </Route>
            {/* <Route exact path="/homepage/search">
            <Home />
          </Route>
          <Route path="/homepage/wishlist">
            <Home />
          </Route>
          <Route exact path="/homepage/profile">
            <Home />
          </Route>
          
          <Route path="/homepage/shop">
            <Home />
          </Route> */}
            <Route exact path="/">
              <Redirect exact to="/homepage" />
            </Route>
            <Route exact path="/login">
              {showLoading ? (
                <div className="loaderDiv-outer">
                  <div className="loaderDiv-inner">
                    <img src={Logo} alt="LogoLoading" />
                  </div>
                </div>
              ) : (<Welcome />)}
            </Route>
            <Route exact path="/opening">
              <OpeningPage />
            </Route>
            <Route exact path="/onboard/:page" component={Onboard} />
            <Route exact path="/pickinterests">
              <PickInterests />
            </Route>
            <Route exact path="/">
              <Redirect exact to="/opening" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="top" style={{ display: "none" }}>
            <IonTabButton tab="home" href="/homepage">
              {/* <IonIcon icon={triangle} /> */}
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              {/* <IonIcon icon={ellipse} /> */}
              <IonLabel>Login</IonLabel>
            </IonTabButton>
            {/* <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
</IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
