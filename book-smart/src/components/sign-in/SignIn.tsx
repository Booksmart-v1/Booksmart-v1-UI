import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonRouter,
  IonRow,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonButtons,
} from "@ionic/react";
// import { useAuthConnect } from "@ionic-enterprise/auth-react";
import '../ExploreContainer.css';
import './signIn.css';
import { personCircle } from "ionicons/icons";
const SignIn: React.FC = () => {
  // const { error, isAuthenticated, login } = useAuthConnect();
  // const router = useIonRouter();

  useEffect(() => {
    console.log("signin");
  }, [])
  return (

    <IonContent>
      <IonRow>
        <IonCol size="12">
          <IonIcon
            style={{ fontSize: "70px", color: "#0040ff", marginTop: "50px", marginLeft: "170px" }}
            icon={personCircle}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
              type="email"
            // onIonChange={(e) => setEmail(e.detail.value!)}
            >
            </IonInput>
          </IonItem>
          <br />

          <IonItem>
            <IonLabel position="floating"> Password</IonLabel>
            <IonInput
              type="password"
            // onIonChange={(e) => setEmail(e.detail.value!)}
            >
            </IonInput>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <p style={{ fontSize: "small", marginTop: "20px", marginLeft: "20px" }}>
            By clicking LOGIN you agree to our <a href="#">Policy</a>
          </p>
          <br />
          <IonButton className="login" expand="block" >
            Login
          </IonButton>
          <br />
          <p style={{ fontSize: "medium", marginLeft: "20px" }}>
            Don't have an account? <a href="../sign-up/SignUp.tsx">Sign up!</a>
          </p>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default SignIn;