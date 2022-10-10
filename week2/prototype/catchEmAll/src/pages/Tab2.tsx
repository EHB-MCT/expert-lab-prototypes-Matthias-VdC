import {
  CreateAnimation,
  IonButton,
  IonContent,
  IonImg,
  IonLoading,
  IonPage,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useRef, useState } from "react";
import pokemon from "../assets/images/whosthatpokemon.webp";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [difference, setDifference] = useState<any>();
  const [disableButton, setDisableButton] = useState(true);
  const [previousTime, setPreviousTime] = useState<any>();
  const [appear, setAppear] = useState("");

  const [loading, dismiss] = useIonLoading();

  const store = new Storage();
  store.create();

  useIonViewWillEnter(async () => {
    setDisableButton(true);
    await loading({
      message: "Loading...",
      duration: Infinity,
    });
    await store
      .get("treasure")
      .then(async (response) => {
        setPreviousTime(await response);
        console.log(await response);
        const interval = setInterval(() => {
          setDifference(
            Math.round((new Date().getTime() - response.getTime()) / 60000)
          );
        }, 1000);
      })
      .finally(() => {
        setTimeout(() => dismiss(), 1000);
        setDisableButton(false);
      });
  }, []);

  async function getUniquePokemon() {
    setDisableButton(true);
    const pokemonList = await store.get("pokemon");
    const savedPokemons = await store.get("user_pokemon");

    // https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
    let r = Math.floor(Math.random() * 151) + 1;
    let passed = true;

    while (passed) {
      if (!savedPokemons.includes(pokemonList[r])) {
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

    console.log(pokemonList[r]);

    await fetch(pokemonList[r].url)
      .then((response) => response.json())
      .then((data) => {
        // @ts-ignore: next-line
        document.getElementById("pokemonTreasure-pokemon-img").src =
          data.sprites.front_default;
        setAppear("appear");
      });

    await store
      .set("treasure", new Date())
      .then(async () => {
        await store.set("user_pokemon", savedPokemons);
      })
      .finally(() => {
        setDisableButton(false);
      });
  }

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
        {2 - difference > 0 ? (
          <IonButton disabled={true}>{60 - difference} minutes left</IonButton>
        ) : (
          <IonButton
            disabled={disableButton}
            onClick={() => getUniquePokemon()}
          >
            Get Pokemon
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
