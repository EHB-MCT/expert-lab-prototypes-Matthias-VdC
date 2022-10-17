import { LocalNotifications } from "@capacitor/local-notifications";
import {
  IonButton,
  IonContent,
  IonImg,
  IonLoading,
  IonPage,
} from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import pokemon from "../assets/images/whosthatpokemon.webp";
import NotificationService from "../services/NotificationService";
import "./Tab2.css";

const Tab2: React.FC = () => {
  // difference in time from [currentTime - previousTime]
  // if current time is equal or bigger than previousTime the user can find a new pokemon
  const [difference, setDifference] = useState<any>(0);
  const [previousTime, setPreviousTime] = useState<any>(new Date());
  const [getPokemonButton, setGetPokemonButton] = useState(false);
  const [appear, setAppear] = useState("");

  // In minutes
  const waitTime = 60 * 24;
  const store = new Storage();
  store.create();

  useEffect(() => {
    store.get("treasure").then((response) => {
      setPreviousTime(response);
    });
    LocalNotifications.removeAllDeliveredNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDifference(
        Math.round((new Date().getTime() - previousTime.getTime()) / 60000)
      );
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, [previousTime]);

  useEffect(() => {
    if (difference >= waitTime) {
      setGetPokemonButton(false);
    } else {
      setGetPokemonButton(true);
    }
  }, [difference]);

  async function getUniquePokemon() {
    const pokemonList = await store.get("pokemon");
    const savedPokemons = await store.get("user_pokemon");

    // https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
    let r = Math.floor(Math.random() * 151) + 1;
    let passed = true;

    while (passed) {
      if (
        // Check if pokemon is already owned, if so it takes another random pokemon
        savedPokemons.some(
          // eslint-disable-next-line no-loop-func
          (singlePokemon: any) =>
            singlePokemon.name.name !== pokemonList[r].name
        )
      ) {
        passed = false;
      } else {
        r = Math.floor(Math.random() * 151) + 1;
      }
    }

    savedPokemons.push({
      name: pokemonList[r],
      level: 1,
      experience: 1,
      dv: Math.floor(Math.random() * 31) + 1,
    });

    let now = new Date();
    now.setMinutes(now.getMinutes() + waitTime); // timestamp
    now = new Date(now); // Date object
    NotificationService.schedule(now);

    await fetch(pokemonList[r].url)
      .then((response) => response.json())
      .then((data) => {
        // @ts-ignore: next-line
        document.getElementById("pokemonTreasure-pokemon-img").src =
          data.sprites.front_default;
        setAppear("appear");
      });
    await store.set("treasure", new Date()).then(async () => {
      await store.set("user_pokemon", savedPokemons);
    });
    setPreviousTime(new Date());
    setDifference(
      Math.round((new Date().getTime() - previousTime.getTime()) / 60000)
    );
  }

  if (typeof difference === "undefined")
    return <IonLoading isOpen={true} duration={Infinity}></IonLoading>;

  return (
    <IonPage>
      <IonContent fullscreen className="pokemonTreasure-container">
        <div className="pokemonTreasure-img-container">
          <IonImg src={pokemon} className="pokemonTreasure-Img"></IonImg>
          <IonImg
            className={appear}
            id="pokemonTreasure-pokemon-img"
            alt=""
          ></IonImg>
        </div>
        {difference < waitTime ? (
          <IonButton disabled={true}>
            {waitTime - difference} minutes left
          </IonButton>
        ) : (
          <IonButton disabled={getPokemonButton} onClick={getUniquePokemon}>
            Get Pokemon
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
