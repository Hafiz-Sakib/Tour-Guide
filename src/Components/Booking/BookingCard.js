// src/Components/Booking/BookingCard.js
import { Link } from "react-router-dom";
import { FiStar, FiArrowRight, FiMapPin } from "react-icons/fi";

const BookingCard = ({ service }) => {
  const { name, balance, picture, id } = service;

  return (
    <div className="group bg-white rounded-[28px] overflow-hidden border border-[#e7dfd0] hover:border-[#c9a84c]/30 hover:shadow-2xl hover:shadow-[#0d1f35]/8 transition-all duration-500 hover:-translate-y-2 card-premium">
      {/* Image */}
      <div className="relative aspect-[16/10] img-zoom overflow-hidden">
        <img src={picture} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/65 via-[#0d1f35]/15 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
          <FiStar className="text-[#c9a84c] h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-black text-[#0d1f35]">4.9</span>
        </div>

        {/* Location tag */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 glass text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          <FiMapPin size={11} className="text-[#c9a84c]" /> Bangladesh
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <h3
          className="text-xl font-black leading-tight text-[#0d1f35] mb-3 line-clamp-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {name}
        </h3>

        <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#e7dfd0]">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#5a6a7e] font-bold">
              From
            </p>
            <p
              className="text-3xl font-black text-[#e85d45]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {balance}
            </p>
          </div>
          <Link
            to={`/booking/${id}`}
            className="
              group/btn inline-flex items-center gap-2 px-6 py-3
              bg-[#0d1f35] text-white text-[11px] font-black uppercase tracking-widest
              rounded-2xl hover:bg-[#0b6b62] transition-all duration-300
              hover:shadow-lg hover:shadow-[#0b6b62]/20 active:scale-95
            "
          >
            View Details
            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
