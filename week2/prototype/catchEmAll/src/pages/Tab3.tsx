import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";

const Tab3: React.FC = () => {
  // useEffect(() => {
  //   let flags = NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V;
  //   let readermode = NFC.readerMode(flags).subscribe(
  //     (tag) => console.log(JSON.stringify(tag)),
  //     (err) => console.log("error reading tag", err)
  //   );
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonText>Trade</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Tab3;
