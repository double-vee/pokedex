import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Page } from '../../components/page';
import { Title } from '../../components/title';

export const PokemonDetails = () => {
  const { id } = useParams();

  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favPokemons, setFavPokemons] = useLocalStorage('pokemons', []);
  const [alert, setAlert] = useState(null);
  const [favState, setFavState] = useState('initial');

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(URL);
        const data = await response.json();

        setPokemonData(data);
        setLoading(false);
        setFavState('initial');
      } catch (error) {
        setError('Could not fetch data');
        setLoading(false);
        console.log(error);
      }
    };

    getPokemon();
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

    setFavState('faving');

    if (favPokemons.length === 6) {
      setFavPokemons(favPokemons.shift());
    }

    setFavPokemons([...favPokemons, pokemonData]);
    setFavState('faved');
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

      {!loading && !error && pokemonData !== null && (
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
          {alert ? (
            <>
              <p className="poke-font mb-8 font-semibold leading-relaxed text-center text-red-900">
                {alert}
              </p>
              <Link
                to="/pokemons"
                className="poke-font py-2 px-4 hover:text-black text-white text-l"
              >
                Back to Pokemons
              </Link>
            </>
          ) : (
            <button
              className="poke-font py-2 px-4 bg-white hover:bg-red-100 rounded text-red-500 font-semibold text-base uppercase"
              onClick={addToFav}
              disabled={favState !== 'initial'}
            >
              {favState === 'initial'
                ? 'Add to favorites'
                : favState === 'faving'
                ? 'Adding...'
                : 'Added!'}
            </button>
          )}
        </>
      )}
    </Page>
  );
};
