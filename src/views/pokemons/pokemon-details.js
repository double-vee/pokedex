import { useState, useEffect } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";

export const PokemonDetails = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favPokemons, setFavPokemons] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
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
        <p className="py-12 poke-font font-semibold text-4xl text-center text-white">
          Loading...
        </p>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Title>Pokemon details</Title>
        <p className="py-12 poke-font font-semibold leading-normal text-4xl text-center text-red-900">
          Something went wrong :(
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Pokemon details</Title>
      <figure className="max-w-md mt-4 mb-8 bg-gray-100 rounded-xl p-4">
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
        className="py-2 px-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-xl uppercase"
        onClick={addToFav}
      >
        Add to favorites
      </button>
    </Page>
  );
};
