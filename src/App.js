import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Favorites } from "./views/favorites/favorites";
import { Home } from "./views/home/home";
import { Pokemons } from "./views/pokemons/pokemons";
import { PokemonDetails } from "./views/pokemons/pokemon-details";

function App() {
  return (
    <main className="App min-h-full overflow-auto p-8 bg-red-100">
      <div className="max-w-2xl py-8 mx-auto">
        <Router>
          <div>
            <nav>
              <ul className="flex poke-font justify-between gap-4">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/pokemons">Pokemons</Link>
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemons" component={Pokemons} />
            <Route path="/pokemons/:id" component={PokemonDetails} />
            <Route path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </div>
    </main>
  );
}

export default App;
