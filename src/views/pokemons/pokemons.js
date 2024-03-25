import { useState, useEffect } from 'react';
import { Page } from '../../components/page';
import { Title } from '../../components/title';
import { Pokemon } from './pokemon';
import { Pagination } from './pagination';

export function Pokemons() {
  const API_URL = 'https://pokeapi.co/api/v2/pokemon';

  const [pokemons, setPokemons] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [url, setUrl] = useState(API_URL);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setPokemons(data.results);
        setPokemonCount(data.count);
        setNext(data.next);
        setPrevious(data.previous);
        setLoading(false);
        setLoaded(true);
        setError(null);
      } catch (error) {
        setError('Could not fetch data');
        setLoading(false);
        setLoaded(false);
        console.log(error);
      }
    };

    getPokemons();
  }, [url]);

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

      {loaded && pokemons.length === 0 && (
        <p className="poke-font font-semibold leading-relaxed text-center text-red-900">
          No pokemons fetched
        </p>
      )}

      {loaded && pokemons.length > 0 && (
        <>
          <ol className="poke-font text-white grid grid-cols-1 sm:grid-cols-2 grid-flow-row-dense gap-y-2 gap-x-8 sm:mt-4 mb-8">
            {pokemons.map((pokemon, index) => (
              <Pokemon
                key={pokemon.url.split('/')[6]}
                id={pokemon.url.split('/')[6]}
                name={pokemon.name}
                className={`hover:bg-red-700 cursor-pointer ${
                  index < 10 ? 'sm:col-start-1' : 'sm:col-start-2'
                }`}
              />
            ))}
          </ol>
          <Pagination
            setUrl={setUrl}
            previous={previous}
            next={next}
            pokemonCount={pokemonCount}
          />
        </>
      )}
    </Page>
  );
}
