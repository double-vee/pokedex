import React from 'react';

export const Page = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col items-center mt-4 sm:mt-12 py-8 px-4 sm:px-8 bg-red-500 rounded shadow-xl ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
};
