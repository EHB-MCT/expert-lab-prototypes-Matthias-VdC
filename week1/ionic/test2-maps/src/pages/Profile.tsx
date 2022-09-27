import {
  IonButton,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useState } from "react";
import "./Profile.css";

const Profile: React.FC = () => {
  const [load, setLoad] = useState(false);

  function removeLoad() {
    setLoad(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome to my app</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen={load}></IonLoading>
        <div className="center flex flex-d-col m-t-2">
          <div className="center m-t-2">
            <IonFabButton>
              <IonIcon icon={personOutline}></IonIcon>
            </IonFabButton>
          </div>
          <div className="center m-t-1">
            <IonButton
              onClick={() => {
                setLoad(true);
                setTimeout(removeLoad, 3000);
              }}
            >
              <IonText>Start Loading for 3s</IonText>
            </IonButton>
          </div>
          <IonList style={{ width: "250px" }} className="m-t-2">
            <IonItem>
              <IonSelect interface="popover" placeholder="Select username">
                <IonSelectOption value="jeff">Jeff</IonSelectOption>
                <IonSelectOption value="robert">Robert</IonSelectOption>
                <IonSelectOption value="katrina">Katrina</IonSelectOption>
                <IonSelectOption value="alice">Alice</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <label className="m-t-2">Your description:</label>
          <IonItem className="m-t-1">
            <IonInput placeholder="description"></IonInput>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
