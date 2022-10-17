import {
  IonButton,
  IonLabel,
  IonModal,
  IonPage,
  IonRange,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Storage } from "@ionic/storage";
import "./Tab1.css";
import PokemonCards from "../components/PokemonCards";
import { LocalNotifications } from "@capacitor/local-notifications";

const Tab1: React.FC = () => {
  const store = new Storage();
  store.create();
  const [firstOpen, setFirstOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState<any>(1);
  const [dataValue, setDataValue] = useState<any>();
  const [loading, dismiss] = useIonLoading();
  const modal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(() => {
    // RESET INITIAL POKEMON
    // store.set("first_time", null);

    loading({
      message: "Loading...",
      duration: Infinity,
    });

    LocalNotifications.removeAllDeliveredNotifications();

    //check if app is run for first time https://forum.ionicframework.com/t/how-to-check-first-run-app-with-ionic-app/117214/3
    store
      .get("first_time")
      .then(async (val) => {
        if (val !== null) {
          modal.current?.remove();
          console.log("Already initialized pokemon!");
        } else {
          console.log("Initializing new pokemon");
          await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((response) => response.json())
            .then((data) => {
              setFirstOpen(true);

              store.set("pokemon", data.results);
            });

          store.set("first_time", "done");
        }
      })
      .finally(() => {
        dismiss();
      });
  }, []);

  useEffect(() => {
    setDataValue(store.get("user_pokemon"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startApp() {
    const pokemonList: any = await store.get("pokemon");
    const savedPokemons: any[] = [];

    // https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
    while (savedPokemons.length < rangeValue) {
      let r = Math.floor(Math.random() * 151) + 1;
      if (savedPokemons.indexOf(r) === -1) savedPokemons.push(r);
    }

    savedPokemons.forEach(
      (pokemon, index) =>
        (savedPokemons[index] = {
          name: pokemonList[pokemon],
          level: 1,
          experience: 1,
          dv: Math.floor(Math.random() * 31) + 1,
        })
    );
    setFirstOpen(false);
    await store.set("user_pokemon", savedPokemons);
    await store.set("treasure", new Date());
    modal.current!.style.display = "none";
    modal.current?.remove();
    window.location.reload();
  }

  const closeModal = () => {
    setFirstOpen(false);
  };

  return (
    <IonPage>
      <PokemonCards myValue={dataValue} />

      <IonModal
        className="modal"
        isOpen={firstOpen}
        onDidDismiss={closeModal}
        ref={modal}
      >
        <h1>How many pokemons do you want to start with?</h1>
        <IonRange
          className="modal-range"
          class="modal-range"
          min={1}
          max={6}
          pin={true}
          ticks={true}
          snaps={true}
          onIonChange={({ detail }) => setRangeValue(detail.value)}
        ></IonRange>
        <IonButton onClick={startApp}>Generate Pokemon</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default Tab1;
