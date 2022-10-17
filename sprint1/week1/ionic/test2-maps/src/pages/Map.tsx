import {
  IonContent,
  IonHeader,
  IonPage,
  IonTab,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { useRef, useState } from "react";
import { GoogleMap } from "@capacitor/google-maps";
import "./Map.css";

const Map: React.FC = () => {
  const key = "AIzaSyDehWh4MS-F_1lInu3tDMl5_d489x2s_hM";
  let newMap!: GoogleMap;
  const mapRef = useRef(null);
  const [presentAlert] = useIonAlert();

  const [mapConfig, setMapConfig] = useState({
    zoom: 10,
    center: { lat: 34, lng: -117.9 },
  });

  const createMap = async () => {
    if (!mapRef.current) return;

    newMap = await GoogleMap?.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig,
    });

    // Add a marker to the map
    await newMap.addMarker({
      coordinate: {
        lat: 33.6,
        lng: -117.9,
      },
    });

    // Move the map programmatically
    await newMap.setCamera({
      coordinate: {
        lat: 33.6,
        lng: -117.9,
      },
    });

    // Handle marker click
    await newMap.setOnMarkerClickListener((e: any) => {
      presentAlert({
        header: "Alert",
        subHeader: "Important message",
        message: "This is an alert!",
        buttons: ["OK"],
      });
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
