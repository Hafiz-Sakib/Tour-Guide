import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = (props) => {
  const { name, balance, picture, about, id } = props.service;
  return (
    <div>
      <div className="flex justify-center">
        <div
          className="rounded-lg shadow-lg shadow-gray-600 bg-white max-w-sm"
          id="card"
        >
          <a href="#!">
            <img className="rounded-t-lg" src={picture} alt="" />
          </a>
          <div className="p-6">
            <h5 className="text-violet-600 text-2xl font-medium mb-2">
              {name}
            </h5>
            <p className="text-gray-700 text-base mb-4">{about}</p>
            <p className="text-red-600"> Cost: {balance}</p>
            <br />
            <Link to={`/Booking/${id}`}>
              <button
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Book Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
