import { Page } from "../../components/page";
import { Title } from "../../components/title";
import { PokemonProfile } from "./pokemon-profile";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Favorites = () => {
  const [pokemons, setPokemons] = useLocalStorage("pokemons", []);

  if (pokemons.length === 0) {
    return (
      <Page>
        <Title>Favorites</Title>
        <p className="poke-font font-semibold leading-relaxed text-center text-red-900">
          You have 0 favorite pokemons
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Favorites</Title>
      <div className="grid grid-rows-2 grid-flow-col gap-4 mt-4">
        {pokemons.map((pokemon) => (
          <PokemonProfile
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            avatar={pokemon.sprites.front_default}
          />
        ))}
      </div>
    </Page>
  );
};
