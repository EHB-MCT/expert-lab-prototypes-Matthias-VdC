import {
  IonApp,
  IonIcon,
  IonBadge,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonPage,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  calendar,
  personCircle,
  map,
  informationCircle,
  home,
} from "ionicons/icons";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Info from "./pages/Info";
import React from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Redirect, Route } from "react-router-dom";
import Profile from "./pages/Profile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage id="main">
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(home)" component={Home} exact={true} />
            <Route path="/:tab(profile)" component={Profile} exact={true} />
            <Route path="/:tab(map)" component={Map} exact={true} />
            <Route path="/:tab(info)" component={Info} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
          <Map />

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personCircle} />
              <IonLabel>Profile</IonLabel>
              <IonBadge>2</IonBadge>
            </IonTabButton>

            <IonTabButton tab="map" href="/map">
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>

            <IonTabButton tab="info" href="/info">
              <IonIcon icon={informationCircle} />
              <IonLabel>Info</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
