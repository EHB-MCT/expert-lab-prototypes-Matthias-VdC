import {
  IonContent,
  IonHeader,
  IonPage,
  IonTab,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Welcome to my app</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonText>
            Welcome to this test application made in react & ionic
          </IonText>
        </IonContent>
      </IonPage>
  );
};

export default Home;
