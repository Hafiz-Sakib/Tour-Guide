import React from "react";

const Button = (props) => {
  return (
    <button className="mt-2 bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-4 hover:bg-indigo-600 duration-500">
      {props.children}
    </button>
  );
};

export default Button;
