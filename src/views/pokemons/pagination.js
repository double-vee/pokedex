import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button';

export function Pagination({ setUrl, previous, next, pokemonCount }) {
  const [currentPage, setCurrentPage] = useState(1);

  const OFFSET = 20;

  const pageNumbers = [];
  const pageCount = Math.ceil(pokemonCount ? pokemonCount / OFFSET : 20);

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  function paginate(num) {
    let targetOffset = num * OFFSET - OFFSET;

    setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${targetOffset}&limit=20`);

    setCurrentPage(num);
  }

  const handleNext = () => {
    setUrl(next);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setUrl(previous);
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <nav className="flex flex-col gap-6">
      <ul className="flex flex-wrap justify-center gap-y-1">
        {pageNumbers.map((num) => (
          <li key={num}>
            <Link
              to="/pokemons"
              onClick={() => paginate(num)}
              className={`${
                currentPage === num ? 'bg-red-700' : 'bg-none'
              } p-2 poke-font text-white text-l`}
            >
              {num}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-6">
        {currentPage > 1 && (
          <Button
            className="w-20 sm:w-28 px-2 sm:px-4 text-xl"
            onClick={handlePrevious}
            aria-label="Previous"
          >
            ←
          </Button>
        )}
        {currentPage < pageCount && (
          <Button
            className="w-20 sm:w-28 px-2 sm:px-4 text-xl"
            onClick={handleNext}
            aria-label="Next"
          >
            →
          </Button>
        )}
      </div>
    </nav>
  );
}
