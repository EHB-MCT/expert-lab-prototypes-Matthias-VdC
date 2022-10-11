import {
  IonButton,
  IonContent,
  IonImg,
  IonLoading,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import pokemon from "../assets/images/whosthatpokemon.webp";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [difference, setDifference] = useState<any>();
  const [previousTime, setPreviousTime] = useState<any>(new Date());
  const [appear, setAppear] = useState("");
  // In minutes
  const waitTime = 60;

  const store = new Storage();
  store.create();

  useEffect(() => {
    store.get("treasure").then((response) => {
      setPreviousTime(response);
    });
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

  async function getUniquePokemon() {
    const pokemonList = await store.get("pokemon");
    const savedPokemons = await store.get("user_pokemon");

    // https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
    let r = Math.floor(Math.random() * 151) + 1;
    let passed = true;

    console.log(pokemonList[r]);

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
        {waitTime - difference > 0 ? (
          <IonButton disabled={true}>
            {waitTime - difference} minutes left
          </IonButton>
        ) : (
          <IonButton
            onClick={() => {
              getUniquePokemon();
            }}
          >
            Get Pokemon
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
