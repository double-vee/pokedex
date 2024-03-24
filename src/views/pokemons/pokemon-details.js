import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Page } from '../../components/page';
import { Title } from '../../components/title';

export const PokemonDetails = ({ match: { params } }) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${params.id}`;

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favPokemons, setFavPokemons] = useLocalStorage('pokemons', []);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch data');
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
  }, [URL]);

  const addToFav = () => {
    if (favPokemons.find((pokemon) => pokemon.id === pokemonData.id)) {
      setAlert(
        `You have already added ${pokemonData.name[0].toUpperCase()}${pokemonData.name.slice(
          1
        )}`
      );
      return;
    }

    if (favPokemons.length === 6) {
      setFavPokemons(favPokemons.shift());
    }

    setFavPokemons([...favPokemons, pokemonData]);
  };

  return (
    <Page>
      <Title>Pokemon details</Title>

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

      {pokemonData !== null && (
        <>
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
                {pokemonData.types.map(({ type }) => type.name).join(', ')}
              </div>
            </figcaption>
          </figure>
          {alert && (
            <p className="poke-font mb-8 font-semibold leading-relaxed text-center text-red-900">
              {alert}
            </p>
          )}
          <button
            className="poke-font py-2 px-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-base uppercase"
            onClick={addToFav}
          >
            Add to favorites
          </button>
        </>
      )}
    </Page>
  );
};
