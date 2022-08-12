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
  IonModal,
  IonTitle,
  IonInput,
  IonFooter,
  IonList,
  IonItemDivider,
  IonToggle,
  IonToast,
  IonAccordionGroup,
  IonAccordion,
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

  // -----------
  const a = localStorage.getItem("user");
  if (a) {
    var userId = JSON.parse(a).id;
    var username = JSON.parse(a).name;
  }
  const [showModal, setShowModal] = useState(false)
  // const [changeName, setChangeName] = useState(username);
  const [changeName, setChangeName] = useState("Username");
  const [changeUsername, setChangeUsername] = useState("Name");
  const [editName, setEditName] = useState(false);
  const [editUserName, setEditUserName] = useState(false);

  // Toggle Check - Ask for better technique
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);

  const [isDisabled1, setIsDisabled1] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);

  const handleSaveChange = () => {
    // Save data here
    setShowModal(false)
  }

  const handleToggleChange1 = (e: any) => {
    setChecked1(e.detail.checked);
    setShowToast1(true);
  }
  const handleToggleChange2 = (e: any) => {
    setChecked2(e.detail.checked);
    setShowToast2(true);
  }
  const handleToggleChange3 = (e: any) => {
    setChecked3(e.detail.checked);
    setShowToast3(true);
  }
  const handleToggleChange4 = (e: any) => {
    setChecked4(e.detail.checked);
    setShowToast4(true);
  }

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
                  setShowPopover({ showPopover: false, event: undefined })}
              >
                <IonItem button onClick={() => { }}>
                  <IonLabel className="profile-orders">My Orders</IonLabel>
                </IonItem>
                <IonItem button onClick={() => { }}>
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
                      <IonCardSubtitle className="status-heading">Status</IonCardSubtitle>
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


          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonHeader>
              <IonToolbar style={{ padding: "10px 0" }}>
                <IonButtons slot="end">
                  <IonButton onClick={() => { setShowModal(false) }}>Close</IonButton>
                </IonButtons>
                <IonTitle>
                  <h2 style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "24px" }}>Settings</h2>
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setShowToast1(false)}
                message={checked1 ? "Application Notifications has been enabled." : "Application Notifications has been disabled."}
                position="top"
                duration={250}
              />
              <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setShowToast2(false)}
                message={checked2 ? "SMS and Email Notification has been enabled." : "SMS and Email Notification has been disabled."}
                position="top"
                duration={250}
              />
              <IonToast
                isOpen={showToast3}
                onDidDismiss={() => setShowToast3(false)}
                message={checked3 ? "Special Offer has been enabled." : "Special Offer has been disabled."}
                position="top"
                duration={250}
              />
              <IonToast
                isOpen={showToast4}
                onDidDismiss={() => setShowToast4(false)}
                message={checked4 ? "Read Reminder has been enabled." : "Read Reminder has been disabled."}
                position="top"
                duration={250}
              />
              <IonAccordionGroup multiple={true} value="default">
                <IonAccordion value="default">
                  <IonItem slot="header" color="light">
                    <IonLabel style={{ fontFamily: "Montserrat-B" }}>Notification Settings</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "10px" }}>
                      <IonLabel style={{ fontFamily: "Montserrat-SB" }}>Application Notifications</IonLabel>
                      <IonToggle value="AppNotify" checked={checked1} onIonChange={(e: any) => handleToggleChange1(e)} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "10px" }}>
                      <IonLabel style={{ fontFamily: "Montserrat-SB" }}>SMS and Email Notification</IonLabel>
                      <IonToggle value="SMSEmailNotify" checked={checked2} onIonChange={(e: any) => handleToggleChange2(e)} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "10px" }}>
                      <IonLabel style={{ fontFamily: "Montserrat-SB" }}>Special Offer</IonLabel>
                      <IonToggle value="SplOffer" checked={checked3} onIonChange={(e: any) => handleToggleChange3(e)} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", padding: "10px" }}>
                      <IonLabel style={{ fontFamily: "Montserrat-SB" }}>Read Reminder</IonLabel>
                      <IonToggle value="ReadRemind" checked={checked4} onIonChange={(e: any) => handleToggleChange4(e)} />
                    </div>
                  </div>
                </IonAccordion>
                <IonAccordion value="default1">
                  <IonItem slot="header" color="light">
                    <IonLabel style={{ fontFamily: "Montserrat-B" }}>User Settings</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
                      <IonInput style={{ fontFamily: "Montserrat-SB" }} type="text" placeholder="Change Name" value={changeName} onIonChange={(e: any) => { setChangeName(e.target.value) }} disabled={isDisabled1}></IonInput>
                      {editName ? (
                        <IonButton style={{ height: "25px" }} onClick={() => {
                          setEditName(false)
                          setIsDisabled1(true)
                        }}
                        >{"Save"}</IonButton>
                      ) : (
                        <IonIcon
                          onClick={() => {
                            setEditName(true)
                            setIsDisabled1(false)
                          }}
                          icon={createOutline}
                          className="set-status"
                          color="dark"
                        ></IonIcon>
                      )}
                    </div>
                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", padding: "0 10px" }}>
                      <IonInput style={{ fontFamily: "Montserrat-SB" }} type="text" placeholder="Change Username" value={changeUsername} onIonChange={(e: any) => { setChangeUsername(e.target.value) }} disabled={isDisabled2}></IonInput>
                      {editUserName ? (
                        <IonButton style={{ height: "25px" }} onClick={() => {
                          setEditUserName(false)
                          setIsDisabled2(true)
                        }}
                        >{"Save"}</IonButton>
                      ) : (
                        <IonIcon
                          onClick={() => {
                            setEditUserName(true)
                            setIsDisabled2(false);
                          }}
                          icon={createOutline}
                          className="set-status"
                          color="dark"
                        ></IonIcon>
                      )}
                    </div>
                  </div>
                </IonAccordion>
                <IonAccordion value="default2">
                  <IonItem slot="header" color="light">
                    <IonLabel style={{ fontFamily: "Montserrat-B" }}>Change Interests</IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content" style={{ textAlign: "center" }}>
                    <IonLabel style={{ fontFamily: "Montserrat-SB", padding: "0 10px" }} > <a href="/pickinterests" style={{ textDecoration: "none", color: "black" }}>Pick Your Interests</a></IonLabel>
                  </div>
                </IonAccordion>
              </IonAccordionGroup>

            </IonContent>
            <IonFooter>
              <button className='long-cta' onClick={handleSaveChange}>Save Changes</button>
            </IonFooter>
          </IonModal>
          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard className="profileActionCard" onClick={() => setShowModal(true)}>
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
      </IonContent >
    </IonPage >
  );
};

export default Profile;
