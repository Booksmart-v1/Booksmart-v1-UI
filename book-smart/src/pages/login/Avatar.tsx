import React from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonFooter,
  IonGrid,
  IonItem,
  IonPage,
  IonRippleEffect,
  IonRow,
} from "@ionic/react";
import "./avatar.css";
import { useHistory } from "react-router-dom";

function Example() {
  const history = useHistory();
  return (
    <>
      <IonPage>
        <IonAvatar
          style={{
            display: "flex",
            alignItems: "center",
            height: "150px",
            width: "150px",
          }}
        >
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonFooter>
          <IonGrid style={{ display: "flex", justifyContent: "space-around" }}>
            <IonRow>
              <IonCol size="5">
                <button
                  style={{
                    marginRight: "210px",
                    width: "180px",
                    border: "1px solid white",
                  }}
                  className="long-cta"
                >
                  Skip
                </button>
              </IonCol>
              <IonCol size="7">
                <button
                  style={{
                    marginLeft: "30px",
                    width: "180px",
                    border: "1px solid white",
                  }}
                  className="long-cta"
                  onClick={() => history.push("/pickInterests")}
                >
                  Continue
                </button>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonRippleEffect></IonRippleEffect>
        </IonFooter>
      </IonPage>
    </>
  );
}
export default Example;
