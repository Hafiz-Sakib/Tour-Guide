import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiTag } from "react-icons/fi";

const ServiceCard = ({ service }) => {
  const { name, balance, picture, about, id } = service;

  return (
    <div className="group bg-white rounded-sm overflow-hidden border border-sand card-hover">
      {/* IMAGE */}
      <div className="overflow-hidden aspect-[16/10] relative">
        <img
          src={picture}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* BODY */}
      <div className="p-6">
        <span className="badge mb-3 inline-block">Tour Package</span>

        <h3 className="font-cormorant text-2xl font-semibold text-forest mb-2 leading-snug">
          {name}
        </h3>

        <p className="text-smoke text-sm leading-relaxed mb-5 line-clamp-2">
          {about}
        </p>

        {/* META */}
        <div className="flex items-center gap-4 text-xs text-smoke mb-5">
          <span className="flex items-center gap-1.5">
            <FiClock className="text-jade" />
            Flexible duration
          </span>

          <span className="flex items-center gap-1.5">
            <FiTag className="text-jade" />

            <span className="font-semibold text-amber">{balance}</span>
          </span>
        </div>

        <Link
          to={`/booking/${id}`}
          className="btn-primary w-full justify-center !py-2.5"
        >
          Book Now <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
