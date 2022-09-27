import {
  IonContent,
  IonHeader,
  IonPage,
  IonTab,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useRef, useState } from "react";
import { GoogleMap } from "@capacitor/google-maps";
import "./Map.css";

const Map: React.FC = () => {
  const key = "AIzaSyDehWh4MS-F_1lInu3tDMl5_d489x2s_hM";
  let newMap;
  const mapRef = useRef(null);

  const [mapConfig, setMapConfig] = useState({
    zoom: 10,
    center: { lat: 34, lng: -117.9 },
  });

  const createMap = async () => {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig,
    });
  };

  useIonViewWillEnter(() => createMap());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Google Maps Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>
      </IonContent>
    </IonPage>
  );
};

export default Map;
