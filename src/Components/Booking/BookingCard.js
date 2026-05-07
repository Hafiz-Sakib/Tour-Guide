import React from "react";
import { Link } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";

const BookingCard = ({ service }) => {
  const { name, balance, picture, id } = service;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#e8e0d0] hover:border-[#c9a84c]/40 hover:shadow-xl hover:shadow-[#c9a84c]/10 transition-all duration-500 hover:-translate-y-1" style={{fontFamily: "'DM Sans', system-ui, sans-serif"}}>
      <div className="overflow-hidden aspect-video relative">
        <img src={picture} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex gap-0.5 mb-3">
          {[1,2,3,4,5].map(i => <FiStar key={i} className="w-3.5 h-3.5" style={{fill:"#c9a84c",color:"#c9a84c"}} />)}
          <span className="text-xs text-[#0a1628]/40 ml-1.5">5.0</span>
        </div>
        <h5 className="text-xl font-black text-[#0a1628] mb-3" style={{fontFamily: "'Playfair Display', Georgia, serif"}}>{name}</h5>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-black text-[#c9a84c]" style={{fontFamily: "'Playfair Display', Georgia, serif"}}>{balance}</span>
          <Link
            to={`/booking/${id}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0a1628] text-white text-xs font-black tracking-wider uppercase rounded-full hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all duration-300"
          >
            Book Now <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
