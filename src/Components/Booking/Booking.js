import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const [service, setService] = useState({});
  const { BookingId } = useParams();
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const matchedProduct = data?.find(
          (singleProduct) => singleProduct.id == BookingId
        );
        setService(matchedProduct);
      });
  }, [BookingId]);
  const { name, balance, picture, about } = service;

  return (
    <div className="mt-36">
      <div
        className="flex max-w-md bg-gray-300 shadow-2xl rounded-lg overflow-hidden ml-2 md:mx-auto"
        id="Bookingcard"
      >
        <div class="flex-none w-48 relative">
          <img
            src={picture}
            alt="shoppingimage"
            className="absolute rounded-lg inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-4">
          <h1 className="text-indigo-600 font-bold text-2xl">{name}</h1>
          <p className="mt-2 text-gray-600 text-sm">{about}</p>
          <div className="flex item-center mt-2">
            <svg
              className="w-5 h-5 fill-current text-orange-700"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
            </svg>
            <svg
              className="w-5 h-5 fill-current text-orange-700"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
            </svg>
            <svg
              className="w-5 h-5 fill-current text-orange-700"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
            </svg>
            <svg
              className="w-5 h-5 fill-current text-orange-700"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
            </svg>
            <svg
              className="w-5 h-5 fill-current text-orange-700"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
            </svg>
          </div>
          <div className="flex item-center justify-between mt-3">
            <h1 className="text-red-700 font-bold text-xl">{balance}</h1>
            <button className="px-3 py-2 bg-blue-800 hover:bg-green-700 text-white text-xs font-bold uppercase rounded">
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
