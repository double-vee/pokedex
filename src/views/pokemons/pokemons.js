import { useState, useEffect } from "react";
import { Page } from "../../components/page";
import { Title } from "../../components/title";
// import { pokeApiResponse } from "../../utils/sampleResponse";

export function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  let API_URL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        setPokemons(result.results);
        setNext(result.next);
        setPrevious(result.previous);
        setLoading(false);
        setLoaded(true);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        setLoaded(false);
      });
  }, []);

  const handleOnClickNext = () => {
    API_URL = next;

    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        setPokemons(result.results);
        setNext(result.next);
        setPrevious(result.previous);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  const handleOnClickPrevious = () => {
    API_URL = previous;

    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        setPokemons(result.results);
        setNext(result.next);
        setPrevious(result.previous);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  return (
    <Page>
      <Title>Pokemons list</Title>
      <p className="text-white py-6 text-center">
        Here will be list of pokemons from pokeapi
      </p>
      <ol className="text-white list-decimal">
        <p className="font-bold">What you need to do</p>
        <li>
          Call pokeapi inside useEffect (remember to not cause infinite loop
          because you'll break pokeapi!) and save the response in state
          (useState)
        </li>
        <li>
          Display list of pokemons (pokeapi uses pagination so keep that in
          mind) like example below
        </li>
        <li>
         [Extra] Add buttons PREVIOUS - NEXT at the bottom so I can load next batch of pokemons
        </li>
        <li>
          Handle states:
          <p>Initial</p>
          <p>Loading</p>
          <p>Loaded</p>
          <p>Error</p>
        </li>
        <li>
          Create pokemon profile page, so when I click on selected pokemon I go
          to the specific page where I can see more details about pokemon
          (pokemonId, name, types and avatar). Refer to Favourites, you'll see
          an example. Remember about react-router you have to create new route
          for this and create separate component and separate Route.
        </li>
        <li>
          In detailed view I want to have{" "}
          <span className="font-bold">ADD TO FAVOURITE </span>button which will
          save selected pokemon to{" "}
          <span className="font-bold">localStorage</span> so later I can display
          it in Favourite component.
          [Extra] Maximum of 6, meaning if I add 7th pokemon
          the first one gets removed from the localStorage
        </li>
      </ol>
      <p className="text-white py-2">
        Example of what I want to see here is something like this
      </p>

      {loading && <p className="py-12 font-semibold text-4xl text-center text-white">Loading...</p>}

      {error && <p className="py-12 font-semibold text-4xl text-center text-red-900">Something went wrong :(</p>}

      <ol className="poke-font text-white grid grid-cols-2 grid-flow-row-dense gap-1">
        {pokemons.map((pokemon, index) => (
          <li
            key={pokemon - index}
            className={`hover:bg-red-700 cursor-pointer ${
              index < 10 ? "col-start-1" : "col-start-2"
            }`}
          >
            #{index + 1} - {pokemon.name}
          </li>
        ))}
      </ol>
      {loaded && (
        <div className="flex justify-center">
          <button className="my-12 mx-4 w-32 py-4 bg-white rounded text-red-500 font-semibold text-xl uppercase" onClick={handleOnClickPrevious}>Previous</button>
          <button className="my-12 mx-4 w-32 py-4 bg-white rounded text-red-500 font-semibold text-xl uppercase" onClick={handleOnClickNext}>Next</button>
        </div>
      )}
    </Page>
  );
}
