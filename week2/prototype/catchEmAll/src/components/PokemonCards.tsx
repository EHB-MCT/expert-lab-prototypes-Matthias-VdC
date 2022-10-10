import { IonContent, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonCard.css";

interface IMyProps {
  myValue: any;
}

const PokemonCards: React.FC<IMyProps> = (pokemon: any) => {
  const [ownedPokemon, setOwnedPokemon] = useState<any>([]);
  const [pokemonHtml, setPokemonHtml] = useState<any>([]);

  useEffect(() => {
    (async () => {
      setPokemonHtml([]);
      setOwnedPokemon(await pokemon.myValue);
      // console.log(await pokemon.myValue);
      // console.log(ownedPokemon);
      // console.log(Math.pow(5, 3));
      // console.log(Math.floor(Math.pow(437899, 1 / 3)));
    })().then(async () => {
      await ownedPokemon.forEach(async (poke: any, index: number) => {
        // console.log(poke);
        await fetch(poke.name.url)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            // console.log(Math.floor(Math.pow(1, 1 / 3)));

            // if (pokemonHtml.contains(data.name)) return;

            // if (ownedPokemon.filter((el: any) => el.name.name === data.name)) {
            //   console.log("DUPLICATE", data.name);
            // }

            // ts-ignore: next-line
            // let unique = [...new Set(ownedPokemon)];
            // console.log(unique);

            // let valueArr = ownedPokemon.map(function (item: any) {
            //   return item.name.name;
            // });
            // let isDuplicate = valueArr.some(function (item: any, idx: any) {
            //   return valueArr.indexOf(item) !== idx;
            // });

            // console.log(isDuplicate);

            // if (ownedPokemon.some((el: any) => el.name.name === data.name)) {
            // }

            setPokemonHtml((prevState: any) => {
              return [
                ...prevState,
                <PokemonCard
                  pokemon={data}
                  pokemonData={poke}
                  key={data.name}
                />,
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

export default PokemonCards;
