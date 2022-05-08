import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineCheckCircle } from "react-icons/hi";

const Modal = ({ closeModal }) => {
  return (
    <div>
      <div
        id="popup-modal"
        tabindex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center backdrop-blur-sm"
        aria-hidden="true"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow-2xl shadow-gray-900 dark:bg-gray-900">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <HiOutlineCheckCircle className="mx-auto mb-4 w-44 h-44 text-green-700 dark:text-green-700"></HiOutlineCheckCircle>
              <h3 className="mb-5 text-2xl font-normal text-blue-700">
                Your Booking Have been Received,Thank You!
              </h3>
              <Link to={"/"}>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-white bg-blue-600  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
