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
  IonBadge,
  IonAvatar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
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
  checkmarkOutline,
  closeOutline,
  settingsOutline,
} from "ionicons/icons";

import Logo from "../images/logo.png"
import { useRef, useState } from "react";

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
  const [showSettingsModal, setShowSettingsModal] = useState(false)

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
    setShowSettingsModal(false)
  }

  // TOGGLE REVISED TECHNIQUE
  // var toggleCheck = [false, false, false, false];
  // var showToggleToast = [false, false, false, false];
  // const [checkToggleList, setCheckToggleList] = useState(toggleCheck)
  // const [showTTList, setShowTTList] = useState(showToggleToast)
  // const handletoggleSelection = (id: number) => {
  //   setCheckToggleList(prevState => prevState.map((item, idx) => idx === id ? !item : item));
  //   setShowTTList(prevState => prevState.map((item, idx) => idx === id ? !item : item));
  // }

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

  // Notifications
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const notifyArray = [
    {
      id: 0,
      img: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
      name: "Name Surname",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: true,
      time: "2 mins ago",
      status: "X",
      isPopOverOpen: false
    },
    {
      id: 1,
      img: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
      name: "Name Surname",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
      time: "10 mins ago",
      status: "X",
      isPopOverOpen: false
    },
    {
      id: 2,
      img: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
      name: "Name Surname",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: true,
      time: "17 mins ago",
      status: "X",
      isPopOverOpen: false
    },
    {
      id: 3,
      img: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
      name: "Name Surname",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
      time: "25 mins ago",
      status: "X",
      isPopOverOpen: false
    },
    {
      id: 4,
      img: "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
      name: "Name Surname",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      read: false,
      time: "1 hr ago",
      status: "X",
      isPopOverOpen: false
    },
  ]

  const [updatedNotifyArray, setUpdatedNotifyArray] = useState(notifyArray)

  // PopOver Box
  const handlePopOverClick = (id: number) => {
    setUpdatedNotifyArray(updatedNotifyArray.map(item => item.id == id ? { ...item, isPopOverOpen: !item.isPopOverOpen, read: true } : item));
  }

  return (
    <IonPage className="md">
      <IonHeader>
        <IonToolbar>
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
                          height: "10vh",
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
          <IonRow className="profileStatusContainer" style={{ margin: "10px 0" }}>
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
                        style={{ height: "20px" }}
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
          <IonRow style={{ margin: "10px 0" }}>
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
          {/* Settings Modal; */}
          <IonModal isOpen={showSettingsModal} onDidDismiss={() => setShowSettingsModal(false)}>
            <IonHeader>
              <IonToolbar style={{ padding: "10px 0" }}>
                <IonButtons slot="end">
                  <IonButton onClick={() => { setShowSettingsModal(false) }}>Close</IonButton>
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
              <IonAccordionGroup multiple={true} value="notifyAccord">
                <IonAccordion value="notifyAccord">
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
                <IonAccordion value="userAccord">
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
                <IonAccordion value="pickAccord">
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

          {/* Settings Bar */}
          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard className="profileActionCard" onClick={() => setShowSettingsModal(true)}>
                <IonCardContent>
                  <IonRow className="ion-justify-content-between">
                    <IonCardSubtitle>Settings</IonCardSubtitle>
                    <IonIcon icon={settingsOutline} />
                  </IonRow>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* Notifications Modal */}
          <IonModal isOpen={showNotifyModal} onDidDismiss={() => setShowNotifyModal(false)}>
            <IonHeader>
              <IonToolbar style={{ padding: "10px 0" }}>
                <IonButtons slot="end">
                  <IonButton onClick={() => { setShowNotifyModal(false) }}>Close</IonButton>
                </IonButtons>
                <IonTitle>
                  <h2 style={{ textAlign: "center", fontFamily: "Montserrat-B", color: "var(--bs-pText)", fontSize: "24px", margin: "5px 0" }}>Notifications</h2>
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <div className="notifyCards-area">
                {updatedNotifyArray.map((item, idx) => {
                  return (
                    <IonItemSliding className='notifyCard' key={idx}>
                      {/* <IonItem lines='none' color={(updatedNotifyArray[idx].status === "X" ? "" : (updatedNotifyArray[idx].status === "Accepted" ? "success" : "danger"))}> */}
                      <IonItem lines='none' onClick={() => { handlePopOverClick(idx) }} id={String(idx)}>
                        <div className="notifyCard-img">
                          <IonAvatar>
                            <img src={item.img} alt="abc" />
                          </IonAvatar>
                        </div>
                        <div className="notifyCard-content" >
                          <h2 style={{ fontFamily: "Montserrat-b", fontSize: "17px" }}>{item.name}</h2>
                          <p style={{ fontFamily: "Montserrat-sb" }}>{item.description}</p>
                        </div>
                        <div className="notify-time">
                          <p style={{ fontFamily: "Montserrat-sb" }}>{item.time}</p>
                          <div className={item.read ? "" : "notify-unread"}></div>
                        </div>
                      </IonItem>
                      <IonPopover isOpen={updatedNotifyArray[idx].isPopOverOpen} side="bottom" alignment="center" trigger={String(idx)} size="cover">
                        <IonContent class="ion-padding">
                          <div style={{ padding: "0 10px" }}>
                            <h2 style={{ fontFamily: "Montserrat-b", fontSize: "17px" }}>{item.name}</h2>
                            <p style={{ fontFamily: "Montserrat-sb", margin: "20px 0", fontSize: "14px" }}>{item.description}</p>
                          </div>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button onClick={(e) => {
                              handlePopOverClick(idx)
                            }} className="popover-close-btn">Close</button>
                          </div>
                        </IonContent>
                      </IonPopover>
                      {/* <IonItemOptions side="start" onClick={() => { handleNotifyStatus(idx, "Accepted") }}> */}
                      <IonItemOptions side="start">
                        <IonItemOption color="success" >
                          <IonIcon icon={checkmarkOutline} style={{ fontSize: "20px" }} />
                          <p style={{ fontFamily: "Montserrat-sb" }}>Accept</p>
                        </IonItemOption>
                      </IonItemOptions>
                      {/* <IonItemOptions side="end" onClick={() => { handleNotifyStatus(idx, "Rejected") }}> */}
                      <IonItemOptions side="end">
                        <IonItemOption color="danger">
                          <IonIcon icon={closeOutline} style={{ fontSize: "20px" }} />
                          <p style={{ fontFamily: "Montserrat-sb" }}>Reject</p>
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  )
                })}
              </div>
            </IonContent>
          </IonModal>

          {/* Notifications Bar */}
          <IonRow className="profileActionContainer">
            <IonCol size="12">
              <IonCard className="profileActionCard" onClick={() => setShowNotifyModal(true)}>
                <IonCardContent style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <IonCardSubtitle>Notifications</IonCardSubtitle>
                  <IonBadge slot="end" color="danger">{updatedNotifyArray.filter((item) => { return (item.read === false) }).length}</IonBadge>
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
