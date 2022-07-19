export const PokemonProfile = ({ number, name, types, avatar }) => {
  return (
    <figure className="max-w-md bg-gray-100 rounded-xl p-4">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover bg-white"
        src={avatar}
        alt={name}
      />
      <div className="pt-4 text-center">
        <figcaption className="font-medium">
          <div className="text-cyan-600">
            #{number} {name}
          </div>
          <div className="text-gray-500">
            {types.map(({ type }) => type.name).join(", ")}
          </div>
        </figcaption>
      </div>
    </figure>
  );
};
