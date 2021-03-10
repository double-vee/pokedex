import { useState, useEffect } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";

export const PokemonDetails = (props) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPokemonData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }, []);

  const handleOnClickAddToFav = () => {
    localStorage.setItem('favourite_pokemon', pokemonData);
  }

  if(loading) {
    return(
      <Page>
        <Title>Pokemon details</Title>
        <p className="py-12 poke-font font-semibold text-4xl text-center text-white">Loading...</p>
      </Page>
    )
  }

  if(error) {
    return(
      <Page>
        <Title>Pokemon details</Title>
        <p className="py-12 poke-font font-semibold leading-normal text-4xl text-center text-red-900">Something went wrong :(</p>
      </Page>
    )
  }

  console.log(pokemonData);

  return(
    <Page>
      <Title>Pokemon details</Title>
      <figure className="max-w-md mt-12 mb-6 bg-gray-100 rounded-xl p-4">
        <img
          className="w-full h-auto rounded-full mx-auto object-cover"
          src={pokemonData.sprites.front_default}
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-4 text-center">
          <figcaption className="font-medium">
            <div className="text-cyan-600 uppercase">#{pokemonData.id} {pokemonData.name}</div>
            <div className="text-gray-500">{pokemonData.types.map(({type}) => type.name).join(', ')}</div>
          </figcaption>
        </div>
      </figure>
      <button className="m-4 py-2 px-4 bg-white rounded text-red-500 font-semibold text-xl uppercase" onClick={handleOnClickAddToFav}>Add to favourites</button>
    </Page>
  )
}