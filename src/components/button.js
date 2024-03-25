export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`py-2 px-4 rounded bg-white hover:bg-red-100 text-red-500 poke-font text-base font-semibold uppercase ${
        className ? className : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
