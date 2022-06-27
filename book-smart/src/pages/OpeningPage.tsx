import { CreateAnimation, IonContent, IonPage } from "@ionic/react";
import React from "react";
import Lottie from "lottie-react";
// import { LottieSplashScreen } from '@awesome-cordova-plugins/lottie-splash-screen';
import "./OpeningPage.css";

const OpeningPage: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: "https://embed.lottiefiles.com/animation/72929",
  };
  return (
    <IonPage>
      <IonContent>
        <div className="opening-page">
          <div className="logo-container">
            {/* <p>he</p> */}
            {/* <Lottie options={defaultOptions}></Lottie> */}
            {/* <iframe src="https://embed.lottiefiles.com/animation/72929"></iframe> */}
            //https://embed.lottiefiles.com/animation/72929
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default OpeningPage;
