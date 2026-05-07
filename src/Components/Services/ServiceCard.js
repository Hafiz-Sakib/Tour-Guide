// src/Components/Services/ServiceCard.js
import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiMapPin, FiStar } from "react-icons/fi";

const ServiceCard = ({ service, dark = false }) => {
  const { name, balance, picture, about, id } = service;

  return (
    <article className="group bg-white border border-[#e7dfd0] rounded-3xl overflow-hidden hover:border-[#c9a84c]/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <Link to={`/booking/${id}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={picture}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badge */}
          <span className="absolute top-5 left-5 bg-white/95 backdrop-blur px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0f766e] rounded-full shadow">
            Curated Tour
          </span>

          {/* Rating */}
          <div className="absolute bottom-5 left-5 flex items-center gap-1 text-[#f4c76b]">
            {[1, 2, 3, 4, 5].map((item) => (
              <FiStar key={item} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
      </Link>

      <div className="p-7">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-black uppercase tracking-widest text-[#65758a]">
            From
          </p>
          <p className="text-3xl font-black text-[#f25f4c]">{balance}</p>
        </div>

        <h3 className="text-2xl font-black leading-tight text-[#132236] mb-4 line-clamp-2">
          {name}
        </h3>

        <p className="text-[#65758a] leading-relaxed line-clamp-3 text-[15px] mb-6">
          {about}
        </p>

        <div className="flex items-center gap-6 text-sm text-[#65758a] mb-8">
          <span className="flex items-center gap-2">
            <FiClock className="text-[#0f766e]" /> Flexible
          </span>
          <span className="flex items-center gap-2">
            <FiMapPin className="text-[#0f766e]" /> Guided
          </span>
        </div>

        <Link
          to={`/booking/${id}`}
          className="block w-full text-center py-4 bg-[#132236] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-[#0f766e] transition-all active:scale-95"
        >
          View Details <FiArrowRight className="inline ml-2" />
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
