import React from "react";

const Button = ({ inputText }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      {inputText}
    </button>
  );
};

export default Button;
