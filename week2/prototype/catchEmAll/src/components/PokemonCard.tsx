import {
  IonBadge,
  IonButton,
  IonImg,
  IonModal,
  IonPage,
  IonText,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "./PokemonCard.css";

type PokemonProps = {
  pokemon: any;
  pokemonData: any;
};

const PokemonCard: React.FC<PokemonProps> = (pokemonProps) => {
  const [poke, setPoke] = useState<any>();
  const [hover, setHover] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    setPoke(pokemonProps);
  }, [pokemonProps]);

  if (!poke) return null;

  return (
    <div
      onClick={() => setIsOpen(true)}
      className="pokemonCardContainer"
      key={poke.pokemonData.name.name}
    >
      <IonBadge
        style={{ position: "absolute", bottom: "46px", zIndex: "99" }}
        slot="end"
      >
        level {poke.pokemonData.level}
      </IonBadge>
      <div
        onMouseOver={() => setHover("hoverPokemon")}
        onMouseLeave={() => setHover("")}
        className={`pokemonCardContainer-img-container`}
      >
        <IonImg
          className={`pokemonCardContainer-img ${hover}`}
          src={poke.pokemon.sprites.front_default}
        />
        {hover ? (
          <IonButton
            className="pokemonCardContainer-img-button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Show Info
          </IonButton>
        ) : null}
      </div>
      <IonText style={{ marginBottom: "12px", fontSize: "20px" }}>
        {poke.pokemonData.name.name}
      </IonText>

      <IonModal ref={modal} isOpen={isOpen} onDidDismiss={closeModal}>
        <IonPage className="pokemonCardContainer-modal">
          <h1>{poke.pokemonData.name.name} stats:</h1>
          <IonText>
            Level: <b>{poke.pokemonData.level}</b>
          </IonText>
          <IonText>
            HP:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[0].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  poke.pokemonData.level +
                  10
              )}
            </b>
          </IonText>
          <IonText>
            Attack:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[1].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  5
              )}
            </b>
          </IonText>
          <IonText>
            Defense:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[2].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  5
              )}
            </b>
          </IonText>
          <IonText>
            Special-Attack:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[3].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  5
              )}
            </b>
          </IonText>
          <IonText>
            Special-Defense:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[4].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  5
              )}
            </b>
          </IonText>
          <IonText>
            Speed:{" "}
            <b>
              {Math.floor(
                ((poke.pokemon.stats[5].base_stat + poke.pokemonData.dv) * 2 +
                  (Math.sqrt(255) / 4) * poke.pokemonData.level) /
                  100 +
                  5
              )}
            </b>
          </IonText>

          {/* 
    // let base = "base stat";
    // let DV = "determined value: 1-31";
    // let EV = "effort value (starts at 0, increases with battles): 0-65535";
    // let level = "pokemon level: 1-100";

    // let HP = (((base + DV) * 2 + Math.sqrt(EV) / 4) * level) / 100 + level + 10;
    // let otherStat = ((base + DV) * 2 + (Math.sqrt(EV) / 4) * level) / 100 + 5;
         */}

          <IonButton
            onClick={() => {
              modal.current?.dismiss();
            }}
          >
            Close
          </IonButton>
        </IonPage>
      </IonModal>
    </div>
  );
};

export default PokemonCard;
