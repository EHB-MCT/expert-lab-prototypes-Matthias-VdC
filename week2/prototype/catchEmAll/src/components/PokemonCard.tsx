import { IonContent, IonImg, IonPage, IonText, IonToolbar } from "@ionic/react";
import { SetStateAction, useEffect, useState } from "react";
import "./PokemonCard.css";

interface IMyProps {
  myValue: any;
}

const PokemonCard: React.FC<IMyProps> = (pokemon: any) => {
  const [ownedPokemon, setOwnedPokemon] = useState<any>([]);
  const [pokemonHtml, setPokemonHtml] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setPokemonHtml([]);
      setOwnedPokemon(await pokemon.myValue);
    })().then(async () => {
      await ownedPokemon.forEach(async (poke: any) => {
        await fetch(poke.url)
          .then((response) => response.json())
          .then((data) => {
            setPokemonHtml((prevState: any) => {
              return [
                ...prevState,
                <div className="pokemonCardContainer" key={poke.name}>
                  <IonImg
                    className="pokemonCardContainer-img"
                    src={data.sprites.front_default}
                  />
                  <IonText>{poke.name}</IonText>
                </div>,
              ];
            });
          });
      });
    });
  }, [ownedPokemon, pokemon]);

  return (
    <IonContent className="pokemonPageContainer" fullscreen>
      <IonToolbar className="pokemonPageContainer-toolbar">
        <h1 className="pokemonPageContainer-title">Owned Pokemon</h1>
      </IonToolbar>
      <div style={{ marginTop: "100px" }}>{pokemonHtml}</div>
    </IonContent>
  );
};

export default PokemonCard;
