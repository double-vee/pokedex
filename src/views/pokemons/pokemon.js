import { Link } from "react-router-dom";

export const Pokemon = ({id, name, className}) => {
  return(
    <Link to={`/pokemons/${id}`} className={className}>
      <li>#{id} - {name}</li>
    </Link>
  )
}