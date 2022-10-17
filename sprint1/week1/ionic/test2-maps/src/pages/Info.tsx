import {
  IonContent,
  IonHeader,
  IonPage,
  IonTab,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Info: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome to my app</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>This is the info page</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Info;
