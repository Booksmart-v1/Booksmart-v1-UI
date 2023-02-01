import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Onboard from "./pages/login/Onboard";
import PickInterests from "./pages/login/PickInterests";
import Welcome from "./pages/login/Welcome";
import * as io from "socket.io-client";
import Home from "./Home";
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
import React, { useEffect, useState } from "react";

setupIonicReact();

var socket = io.connect();

const App: React.FC = () => {
  const [refresh, setRefresh] = React.useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const refreshPage = () => {
    // console.log(refresh);
    setRefresh(!refresh);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  }, []);

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
                    <h1
                      style={{
                        fontSize: "47px",
                        fontFamily: "Serif",
                        fontWeight: "light",
                      }}
                    >
                      BOOKSMART
                    </h1>
                    <p
                      style={{
                        fontSize: "16px",
                        fontFamily: "Montserrat-sb",
                        letterSpacing: "-0.02rem",
                        wordSpacing: "0.04rem",
                      }}
                    >
                      MAKING EVERY HOME, A LIBRARY
                    </p>
                  </div>
                </div>
              ) : (
                <Welcome />
              )}
            </Route>

            <Route exact path="/onboard/:page" component={Onboard} />
            <Route exact path="/pickinterests">
              <PickInterests />
            </Route>
            <Route exact path="/">
              <Redirect exact to="/login" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="top" style={{ display: "none" }}>
            <IonTabButton tab="home" href="/homepage">
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              <IonLabel>Login</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
