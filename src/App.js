import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Favourites } from "./views/favourites/favourites";
import { Home } from "./views/home/home";
import { Pokemons } from "./views/pokemons/pokemons";
import { PokemonDetails } from "./views/pokemons/pokemon-details";

function App() {
  return (
    <main className="App h-screen bg-red-100">
      <div className="max-w-2xl py-8 mx-auto">
        <Router>
          <div>
            <nav>
              <ul className="flex poke-font justify-between">
                <li className="mr-4">
                  <Link to="/">Home</Link>
                </li>
                <li className="mr-4">
                  <Link to="/pokemons">Pokemons</Link>
                </li>
                <li className="mr-4">
                  <Link to="/favourites">Favourites</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemons" component={Pokemons} />
            <Route path="/pokemons/:id" component={PokemonDetails} />
            <Route path="/favourites" component={Favourites} />
          </Switch>
        </Router>
      </div>
    </main>
  );
}

export default App;
