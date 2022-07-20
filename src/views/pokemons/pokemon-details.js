import { useState, useEffect } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";

export const PokemonDetails = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favPokemons, setFavPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storageData = localStorage.getItem("pokemons");
    if (storageData) {
      setFavPokemons(JSON.parse(storageData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(favPokemons));
  }, [favPokemons]);

  const addToFav = () => {
    if (favPokemons.length === 6) {
      setFavPokemons(favPokemons.shift());
    }
    setFavPokemons([...favPokemons, pokemonData]);
  };

  if (loading) {
    return (
      <Page>
        <Title>Pokemon details</Title>
        <p className="poke-font font-semibold text-center text-white">
          Loading...
        </p>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Title>Pokemon details</Title>
        <div className="poke-font font-semibold leading-relaxed text-center text-red-900">
          <p>Something went wrong :(</p>
          <p>{error}</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Pokemon details</Title>
      <figure className="max-w-md sm:mt-4 mb-8 bg-gray-100 rounded-xl p-4">
        <img
          className="w-32 h-32 rounded-full mx-auto object-cover bg-white"
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
        <figcaption className="pt-4 text-center font-medium">
          <div className="text-cyan-600 uppercase">
            #{pokemonData.id} {pokemonData.name}
          </div>
          <div className="text-gray-500">
            {pokemonData.types.map(({ type }) => type.name).join(", ")}
          </div>
        </figcaption>
      </figure>
      <button
        className="poke-font py-2 px-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-base uppercase"
        onClick={addToFav}
      >
        Add to favorites
      </button>
    </Page>
  );
};
