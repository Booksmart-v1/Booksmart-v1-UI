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
} from "@ionic/react";
import "./Profile.css";
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
  logOutOutline,
  logOut,
  settingsOutline,
} from "ionicons/icons";
import { useState } from "react";
import { close } from "fs";

const Profile = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [text, setText] = useState(
    "I love posting content related to Ionic React! Make sure to check out the Ionic React Hub!"
  );

  const [status, setStatus] = useState("Set Status");
  const [editStatus, setEditStatus] = useState(false);

  return (
    <IonPage className="md">
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
						<IonButton color="dark">
							<IonIcon icon={ arrowBackOutline } />
						</IonButton>
					</IonButtons> */}
          <div
            style={{
              fontFamily: "Montserrat-B",
              textAlign: "center",
              fontSize: "20px",
              marginLeft: "20px",
              color: "var(--bs-pText)",
            }}
          >
            Profile
          </div>
          <IonButtons slot="end">
            <IonButton
              onClick={(e: any) => {
                e.persist();
                setShowPopover({ showPopover: true, event: e });
              }}
              color="dark"
            >
              <IonPopover
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                onDidDismiss={() =>
                  setShowPopover({ showPopover: false, event: undefined })
                }
              >
                <IonItem button onClick={() => {}}>
                  <IonLabel className="profile-orders">My Orders</IonLabel>
                </IonItem>
                <IonItem button onClick={() => {}}>
                  <IonLabel className="profile-purchases">
                    My Purchases
                  </IonLabel>
                </IonItem>
                {/* <IonItem button onClick={() => { }}>
							<IonLabel >
								Button Item
							</IonLabel>
							</IonItem> */}
              </IonPopover>
              <IonIcon icon={ellipsisHorizontal} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="topHeader"></div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className="profileHeader">
                <IonCardContent>
                  <IonRow>
                    <IonCol size="5">
                      <img
                        src={profile}
                        alt="avatar"
                        style={{
                          borderRadius: "80px",
                          height: "14vh",
                          width: "60vw",
                        }}
                      />
                      <IonIcon
                        onClick={() => setShowActionSheet(true)}
                        icon={createOutline}
                        className="set-status"
                        color="dark"
                      ></IonIcon>
                      <IonActionSheet
                        isOpen={showActionSheet}
                        header="Set Status"
                        onDidDismiss={() => setShowActionSheet(false)}
                        cssClass="my-custom-class"
                        buttons={[
                          {
                            text: "Focused",
                            icon: share,
                            data: 10,
                            handler: () => {
                              setStatus("Focused");
                              localStorage.setItem(status, "Focused");
                              console.log("Share clicked");
                            },
                          },
                          {
                            text: "Happy",
                            icon: caretForwardCircle,
                            data: "Data value",
                            handler: () => {
                              setStatus("Happy");
                              console.log("Play clicked");
                            },
                          },
                          {
                            text: "Joy",
                            icon: heart,
                            handler: () => {
                              setStatus("Joy");
                              console.log("Favorite clicked");
                            },
                          },
                          {
                            text: "Cancel",
                            role: "destructive",
                            icon: trash,
                            id: "delete-button",
                            data: {
                              type: "delete",
                            },
                            handler: () => {
                              setStatus("Set status");
                              console.log("Delete clicked");
                            },
                          },
                        ]}
                      ></IonActionSheet>
                    </IonCol>
                    <IonCol size="7">
                      <IonRow className="profileInfo">
                        <IonCol size="12">
                          <IonText color="dark" className="profileName">
                            <p>Eva Green</p>
                          </IonText>
                          <IonText color="medium">
                            <p>{status}</p>
                          </IonText>
                        </IonCol>
                      </IonRow>

                      <IonRow className="profileStats">
                        <IonCol className="profileStat">
                          <IonCardTitle
                            style={{
                              color: "var(--bs-pText)",
                              fontSize: "18px",
                            }}
                          >
                            109
                          </IonCardTitle>
                          <IonCardSubtitle>Books Sold</IonCardSubtitle>
                        </IonCol>

                        <IonCol className="profileStat">
                          <IonCardTitle
                            style={{
                              color: "var(--bs-pText)",
                              fontSize: "18px",
                            }}
                          >
                            1.2k
                          </IonCardTitle>
                          <IonCardSubtitle>Books Bought</IonCardSubtitle>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6">
                      <IonButton className="message-button" expand="block">
                        <IonIcon icon={chatboxOutline} size="small" /> &nbsp;
                        Message
                      </IonButton>
                    </IonCol>

                    <IonCol size="6">
                      <IonButton className="follow-button" expand="block">
                        <IonIcon icon={personAddOutline} size="small" />
                        &nbsp; Follow
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <br />
          <IonRow className="profileStatusContainer">
            <IonCol size="12">
              <IonCard className="profileCard">
                <IonCardHeader>
                  <IonRow className="profileStatus">
                    <IonRow>
                      <IonIcon icon={chatboxEllipsesOutline} /> &nbsp;
                      <IonCardSubtitle className="status-heading">
                        Status
                      </IonCardSubtitle>
                    </IonRow>
                    {editStatus ? (
                      <IonButton
                        style={{ height: "25px" }}
                        onClick={() => setEditStatus(false)}
                      >
                        {"Save"}
                      </IonButton>
                    ) : (
                      <IonIcon
                        onClick={() => setEditStatus(true)}
                        icon={createOutline}
                        className="set-status"
                        color="dark"
                      ></IonIcon>
                    )}
                  </IonRow>
                </IonCardHeader>
                <IonCardContent>
                  {editStatus ? (
                    <IonTextarea
                      placeholder="Enter more information here..."
                      value={text}
                      onIonChange={(e) => setText(e.detail.value!)}
                    ></IonTextarea>
                  ) : (
                    <IonText>
                      <p>{text}</p>
                    </IonText>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <br />
          <IonRow>
            <IonCol size="6">
              <IonCard className="profileCard">
                <IonCardContent>
                  <IonIcon icon={imageOutline} />
                  <IonCardTitle>147</IonCardTitle>
                  <IonCardSubtitle>Photos</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard className="profileCard">
                <IonCardContent>
                  <IonIcon icon={bookmarkOutline} />
                  <IonCardTitle>63</IonCardTitle>
                  <IonCardSubtitle>Bookmarks</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <br />
          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard
                className="profileActionCard"
                onClick={() => setShowActionSheet(true)}
              >
                <IonCardContent>
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>Settings</IonCardSubtitle>
                    <IonIcon icon={settingsOutline} />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard className="profileActionCard">
                <IonCardContent
                  onClick={() => {
                    // localStorage.removeItem("user");
                  }}
                >
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>Logout</IonCardSubtitle>
                    <IonIcon icon={logOutOutline} />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
