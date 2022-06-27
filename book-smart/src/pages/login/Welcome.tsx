import React from "react";
import {
  IonContent,
  IonText,
  IonRow,
  IonCol,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonImg,
} from "@ionic/react";
import { CreateAnimation, Animation } from "@ionic/react";
// import { LottieSplashScreen } from '@awesome-cordova-plugins/lottie-splash-screen';
import ExploreContainer from "../../components/ExploreContainer";
import "./welcome.css";
import logo from "../../images/main_bg.jpg";
import leaf from "../../images/leaf.png";
import ellipse from "../../images/ellipse.png";

import { useHistory } from "react-router-dom";

const Welcome: React.FC = () => {
  const history = useHistory();

  const showLottieScreen = async () => {
    //await LottieSplashScreen.show('../../lottie/72170-books.json',false,100,100);
  };

  React.useEffect(() => {
    // showLottieScreen();
    // const timer = setTimeout(async () => {
    //   await LottieSplashScreen.hide()
    // }, 10000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <IonPage className="ion-no-padding">
      {/* <CreateAnimation
        duration={1500}
        iterations={Infinity}
        fromTo={[
          {
            property: "transform",
            fromValue: "translateX(0px)",
            toValue: "translateX(100px)",
          },
          { property: "opacity", fromValue: "1", toValue: "0.2" },
        ]}
      >
        ..
      </CreateAnimation> */}
      <IonContent className="ion-padding over" scrollY={false}>
        <IonRow style={{ width: "100vw" }}>
          <IonCol className="ion-text-center smart">𝐁𝐎𝐎𝐊𝐒𝐌𝐀𝐑𝐓</IonCol>
          <div className="tagline">
            Making every home, <p className="tagline1"> A library.</p>
          </div>
        </IonRow>
        <br />
        <IonButton
          className="sign-in"
          onClick={() => {
            console.log("hello");
            history.push("/onboard/signin");
          }}
          expand="block"
          fill="solid"
        >
          Sign In
        </IonButton>
        <IonButton
          className="sign-up"
          onClick={() => {
            console.log("hello");
            history.push("/onboard/signup");
          }}
          expand="block"
          fill="solid"
        >
          Sign Up
        </IonButton>
        <br /> <br />
        <br />
        <br />
        <br />
        <IonCol className="text-center"></IonCol>
      </IonContent>
      <IonImg className="woman" src={logo} />
      <IonImg className="ellipse" src={ellipse} />
      <IonImg className="leaf" src={leaf} />
    </IonPage>
  );
};

export default Welcome;
