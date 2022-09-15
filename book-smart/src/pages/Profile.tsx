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
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonToolbar,
  IonItem,
  IonLabel,
  IonTextarea,
  IonModal,
  IonTitle,
  IonInput,
  IonFooter,
  IonToggle,
  IonToast,
  IonAccordionGroup,
  IonAccordion,
  IonBadge,
  IonAvatar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  useIonAlert,
} from "@ionic/react";
import "./Profile.css";
import { RefresherEventDetail } from "@ionic/core";
import profile from "../images/profile-image.jpg";
// import { useHistory } from "react-router-dom";
import {
  chatboxEllipsesOutline,
  ellipsisHorizontal,
  personAddOutline,
  chatboxOutline,
  createOutline,
  caretForwardCircle,
  share,
  trash,
  heart,
  logOutOutline,
  checkmarkOutline,
  closeOutline,
  settingsOutline,
  notificationsOutline
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { APIURL } from "../constants";
import axios from "axios";
import { useHistory } from "react-router";
import moment from 'moment';
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
  const defaultProfileImg = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg"
  const [showNotifyModal, setShowNotifyModal] = useState(false)

  // PopOver Box
  const [notifyArray, setNotifyArray] = useState<any>([])
  const getNotify = () => {
    const url = APIURL + "v2/getUserNotifs";
    let userId = "";
    let username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .get(url + `?userId=${userId}`)
      .then((resp) => {
        // console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          let updateData = data.map((item: any) => ({
            ...item, isPopOverOpen: false, date: new Date(item.updatedAt.slice(0, -1)),
            timeSince: moment(item.updatedAt.substring(0, 10).replaceAll("-", ""), "YYYYMMDD").fromNow(), time: new Date(item.updatedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }).substring(12, 17)
          }))
          // let updateData = data.map((item: any) => ({ ...item, isPopOverOpen: false, date: new Date(item.updatedAt.slice(0, -1)), time: new Date(item.updatedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }).substring(12, 17) }))
          console.log(updateData);
          setNotifyArray(updateData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };


  useEffect(() => {
    getNotify();
  }, [])

  const handlePopOverClick = (id: number, action: boolean) => {
    if (action === false) {
      const url = APIURL + "v2/readNotif";
      axios
        .post(url, {
          id: notifyArray[id]._id
        })
        .then((resp) => {
          if (resp.status === 200) {
            let data = resp.data.data;
            console.log(data)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setNotifyArray(notifyArray.map((item: any, idx: number) => ((idx === id) ? { ...item, isPopOverOpen: action } : item)));
  }
  const [presentNotifyHandleAlert] = useIonAlert();
  // Sending Accept Notify to seller
  const [showAcceptToast, setShowAcceptToast] = useState(false);
  const handleAcceptClick = (sellerDetails: any) => {
    let receiverId = sellerDetails.senderId;
    let bookId = sellerDetails.bookAdId;
    let notifId = sellerDetails._id;
    sendAcceptNotifyToSeller(receiverId, bookId, notifId);
    setShowAcceptToast(true);
  }
  const sendAcceptNotifyToSeller = (receiverId: string, bookId: string, notifId: string) => {
    const url = APIURL + "v2/sendNotif";
    let userId = "";
    let username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .post(url, {
        userId: userId,
        userName: username,
        receiverId: receiverId,
        type: "accept",
        bookAdId: bookId,
        notifId: notifId
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          console.log(data)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Sending Accept Notify to seller
  const [showRejectToast, setShowRejectToast] = useState(false);
  const handleRejectClick = (sellerDetails: any) => {
    let receiverId = sellerDetails.senderId;
    let bookId = sellerDetails.bookAdId;
    let notifId = sellerDetails._id;
    sendRejectNotifyToSeller(receiverId, bookId, notifId);
    setShowRejectToast(true);
  }
  const sendRejectNotifyToSeller = (receiverId: string, bookId: string, notifId: string) => {
    const url = APIURL + "v2/sendNotif";
    let userId = "";
    let username = "";
    const a = localStorage.getItem("user");
    if (a) {
      userId = JSON.parse(a).id;
      username = JSON.parse(a).name;
    }
    axios
      .post(url, {
        userId: userId,
        userName: username,
        receiverId: receiverId,
        type: "reject",
        bookAdId: bookId,
        notifId: notifId
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          let data = resp.data.data;
          console.log(data)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [showRefreshToast1, setRefreshShowToast1] = useState(false);
  const [showRefreshToast2, setRefreshShowToast2] = useState(false);
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    getNotify();
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const history = useHistory();

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
      <IonContent scrollY={false}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              className="ion-justify-content-center ion-align-items-center ion-text-center"
            >
              <IonCard className="profileHeader">
                <IonCardContent>
                  <IonRow>
                    <IonCol size="6">
                      <img
                        src={profile}
                        alt="avatar"
                        style={{
                          borderRadius: "50%",
                          height: "15vh",
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
                    <IonCol size="6">
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
          <IonRow className="profileStatusContainer" style={{ margin: "20px 0" }}>
            <IonCol size="12">
              <IonCard className="profileCard" style={{ height: "15vh" }}>
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
                      <p style={{ fontFamily: "Montserrat-sb" }}>{text}</p>
                    </IonText>
                  )}
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
              <IonToast
                isOpen={showToast1}
                onDidDismiss={() => setRefreshShowToast1(false)}
                message="Pull to Refresh"
                duration={200}
                translucent={true}
                mode="ios"
                buttons={[
                  {
                    text: "Hide",
                    role: "cancel",
                    handler: () => setRefreshShowToast1(false),
                  },
                ]}
              />

              <IonToast
                isOpen={showToast2}
                onDidDismiss={() => setRefreshShowToast2(false)}
                message={"Hello"}
                duration={400}
                translucent={true}
                mode="ios"
                position="top"
                buttons={[
                  {
                    text: "Hide",
                    role: "cancel",
                    handler: () => setRefreshShowToast2(false),
                  },
                ]}
              />
              <IonRefresher
                slot="fixed"
                placeholder="P"
                onIonRefresh={doRefresh}
                pullFactor={0.5}
                pullMin={100}
                pullMax={200}
                style={{
                  color: "black",
                  fontFamily: "Montserrat-SB",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <p style={{ textAlign: "center" }}> Refreshing Your Notifications!✌️ <br /> Please Wait...</p>
                <IonRefresherContent></IonRefresherContent>
              </IonRefresher>
              <div className="notifyCards-area">
                {notifyArray.map((item: any, idx: number) => {
                  return (
                    <IonItemSliding className='notifyCard' key={idx}>
                      <IonItem lines='none' class="ion-no-padding"
                        onClick={() => { handlePopOverClick(idx, true) }}
                        id={String(idx)}>
                        <div className="notifyCard-img">
                          {!item.isRead && (
                            <div className="notify-unread"></div>
                          )}
                          <IonAvatar>
                            <img src={defaultProfileImg} alt="abc" />
                          </IonAvatar>
                        </div>
                        <div className="notify-date">
                          {item.timeSince}
                          {/* <span style={{ color: "var(--bs-sText)", marginLeft: "10px" }}>{item.time}</span> */}
                          {/* {!item.isRead && (
                            <div className="notify-unread"></div>
                          )} */}
                        </div>
                        <div className="notifyCard-content">
                          <h2 style={{ fontFamily: "Montserrat-b", fontSize: "20px" }}>{item.senderName}</h2>
                          <p style={{ fontFamily: "Montserrat-sb" }}>{item.message.substring(0, 43)}<span style={{ color: "var(--bs-sText)" }}>{item.message.substring(43)}</span></p>
                        </div>
                      </IonItem>
                      <IonPopover reference="event"
                        isOpen={notifyArray[idx].isPopOverOpen}
                      >
                        <IonContent class="ion-padding">
                          <div className="notify-time">
                            {item.date.getDate() + '-' + (item.date.getMonth() + 1) + '-' + item.date.getFullYear()}
                            <span style={{ color: "var(--bs-sText)", marginLeft: "10px" }}>{item.time}</span>
                            {/* <div className="notify-unread"></div> */}
                          </div>
                          <div style={{ padding: "0 12px" }}>
                            <h2 style={{ fontFamily: "Montserrat-b", fontSize: "20px" }}>{item.senderName}</h2>
                            <p style={{ fontFamily: "Montserrat-sb" }}>{item.message.substring(0, 43)}<span style={{ color: "var(--bs-sText)" }}>{item.message.substring(43)}</span></p>
                          </div>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 0" }}>
                            <button onClick={() => {
                              handlePopOverClick(idx, false);
                            }} className="popover-close-btn">Dismiss</button>
                          </div>
                        </IonContent>
                      </IonPopover>
                      {item.type === "interest" ? (
                        <>
                          <IonToast
                            isOpen={showAcceptToast}
                            onDidDismiss={() => setShowAcceptToast(false)}
                            message="Accept Notification has been sent!"
                            duration={200}
                            position="top"
                          />
                          <IonItemOptions side="start">
                            <IonItemOption color="success"
                              onClick={() =>
                                presentNotifyHandleAlert({
                                  header: 'Are you sure you want to Accept?',
                                  buttons: [
                                    {
                                      text: 'Cancel',
                                      role: 'cancel',
                                    },
                                    {
                                      text: 'Accept',
                                      role: 'confirm',
                                      handler: () => {
                                        handleAcceptClick(notifyArray[idx])
                                      },
                                    },
                                  ]
                                })}
                            // onClick={() => { handleAcceptClick(notifyArray[idx]) }}
                            >
                              <IonIcon icon={checkmarkOutline} style={{ fontSize: "20px" }} />
                              <p style={{ fontFamily: "Montserrat-sb" }}>Accept</p>
                            </IonItemOption>
                            <IonToast
                              isOpen={showRejectToast}
                              onDidDismiss={() => setShowRejectToast(false)}
                              message="Reject Notification has been sent!"
                              duration={200}
                              position="top"
                            />
                          </IonItemOptions>
                          <IonItemOptions side="end">
                            <IonItemOption color="danger"
                              onClick={() =>
                                presentNotifyHandleAlert({
                                  header: 'Are you sure you want to Reject?',
                                  buttons: [
                                    {
                                      text: 'Cancel',
                                      role: 'cancel',
                                    },
                                    {
                                      text: 'Reject',
                                      role: 'confirm',
                                      handler: () => {
                                        handleRejectClick(notifyArray[idx])
                                      },
                                    },
                                  ]
                                })}
                            >
                              <IonIcon icon={closeOutline} style={{ fontSize: "20px" }} />
                              <p style={{ fontFamily: "Montserrat-sb" }}>Reject</p>
                            </IonItemOption>
                          </IonItemOptions>
                        </>
                      ) : (
                        <></>
                      )}
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
                  <div>
                    <IonBadge slot="end" color="danger">{notifyArray.filter((item: any) => { return (item.isRead === false) }).length}</IonBadge>
                    <IonIcon icon={notificationsOutline} style={{ marginLeft: "5px" }}></IonIcon>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="profileActionContainer" onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("chatToken");
            document.location.reload()
            history.push("/login")
          }}>
            <IonCol size="12">
              <IonCard className="profileActionCard">
                <IonCardContent>
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
