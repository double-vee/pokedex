import { useState, useEffect } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";
import { Pokemon } from "./pokemon";

export function Pokemons() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [url, setUrl] = useState(API_URL);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch data");
        }
        return response.json();
      })
      .then((result) => {
        setPokemons(result.results);
        setNext(result.next);
        setPrevious(result.previous);
        setLoading(false);
        setLoaded(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setLoaded(false);
      });
  }, [url]);

  const handleNext = () => {
    setUrl(next);
  };

  const handlePrevious = () => {
    setUrl(previous);
  };

  return (
    <Page>
      <Title>Pokemons list</Title>

      {loading && (
        <p className="poke-font font-semibold text-center text-white">
          Loading...
        </p>
      )}

      {error && (
        <div className="poke-font font-semibold leading-relaxed text-center text-red-900">
          <p>Something went wrong :(</p>
          <p>{error}</p>
        </div>
      )}

      {loaded && (
        <>
          <ol className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1 mt-4 mb-8">
            {pokemons.map((pokemon, index) => (
              <Pokemon
                key={pokemon.url.split("/")[6]}
                id={pokemon.url.split("/")[6]}
                name={pokemon.name}
                className={`hover:bg-red-700 cursor-pointer ${
                  index < 10 ? "col-start-1" : "col-start-2"
                }`}
              />
            ))}
          </ol>
          <div className="flex justify-center gap-6">
            <button
              className="w-32 py-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-xl uppercase"
              onClick={handlePrevious}
              disabled={!previous}
            >
              Previous
            </button>
            <button
              className="w-32 py-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-xl uppercase"
              onClick={handleNext}
              disabled={!next}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Page>
  );
}
