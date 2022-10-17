import {
  IonContent,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Storage } from "@ionic/storage";
import PokemonCard from "./PokemonCard";
import "./PokemonCard.css";

interface IMyProps {
  myValue: any;
}

const PokemonCards: React.FC<IMyProps> = (pokemon: any) => {
  const [ownedPokemon, setOwnedPokemon] = useState<any>([]);
  const [pokemonHtml, setPokemonHtml] = useState<any>([]);
  const store = new Storage();
  store.create();

  useEffect(() => {
    setPokemonHtml([]);
    if (pokemon.myValue) {
      pokemon.myValue.then((res: any) => {
        const uniquePokemon = res.filter(
          (v: any, i: any, a: any) =>
            a.findIndex((v2: any) => v2.name.name === v.name.name) === i
        );
        store.set("user_pokemon", uniquePokemon);
        setOwnedPokemon(uniquePokemon);
        uniquePokemon.forEach(async (poke: any) => {
          await fetch(poke.name.url)
            .then((response) => response.json())
            .then((data) => {
              setPokemonHtml((prevState: any) => {
                return [
                  ...prevState,
                  <PokemonCard
                    pokemon={data}
                    pokemonData={poke}
                    key={poke.name.name}
                  />,
                ];
              });
            });
        });
      });
    }
  }, [pokemon.myValue]);

  return (
    <IonContent className="pokemonPageContainer" fullscreen>
      <IonToolbar className="pokemonPageContainer-toolbar">
        <h1 className="pokemonPageContainer-title">Owned Pokemon</h1>
      </IonToolbar>
      <div style={{ marginTop: "100px" }}>{pokemonHtml}</div>
    </IonContent>
  );
};

export default PokemonCards;
