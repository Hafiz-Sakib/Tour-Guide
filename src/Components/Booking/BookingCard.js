// src/Components/BookingCard.js
import { Link } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";

const BookingCard = ({ service }) => {
  const { name, balance, picture, id } = service;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#e7dfd0] hover:border-[#f4c76b]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={picture}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-[#0f766e]">
          <FiStar className="text-[#f4c76b]" /> 4.9
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-black leading-tight text-[#132236] mb-3 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#65758a]">
              From
            </p>
            <p className="text-3xl font-black text-[#f25f4c]">{balance}</p>
          </div>

          <Link
            to={`/booking/${id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#132236] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#0f766e] transition-all group-hover:pr-8"
          >
            View Details
            <FiArrowRight className="transition" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
