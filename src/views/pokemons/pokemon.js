import { Link } from "react-router-dom";

export const Pokemon = ({id, name}) => {
  return(
    <Link to={`/pokemons/${id}`}>
      <li>#{id} - {name}</li>
    </Link>
  )
}