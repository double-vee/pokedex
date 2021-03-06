import React from "react";

export const Title = ({ children, className, ...props }) => {
  return (
    <h1
      className={`poke-font text-xl sm:text-2xl text-center mb-8 text-white font-bold ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
};
