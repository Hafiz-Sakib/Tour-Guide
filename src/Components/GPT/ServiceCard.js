import { Link } from "react-router-dom";
import { FiArrowRight, FiClock, FiMapPin, FiStar } from "react-icons/fi";

const ServiceCard = ({ service, dark = false }) => {
  const { name, balance, picture, about, id } = service;

  return (
    <article className={`group overflow-hidden border transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
      dark ? "border-white/12 bg-white text-[#132236]" : "border-[#e7dfd0] bg-white"
    }`}>
      <Link to={`/booking/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#132236]">
          <img
            src={picture}
            alt={name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132236]/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 bg-white/92 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0f766e]">
            Curated Tour
          </span>
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-[#f4c76b]">
            {[1, 2, 3, 4, 5].map((item) => (
              <FiStar key={item} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#65758a]">From</p>
          <p className="text-xl font-black text-[#f25f4c]">{balance}</p>
        </div>
        <h3 className="text-2xl font-black leading-tight text-[#132236]">{name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#65758a]">{about}</p>

        <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-[#65758a]">
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="text-[#0f766e]" /> Flexible
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin className="text-[#0f766e]" /> Guided
          </span>
        </div>

        <Link
          to={`/booking/${id}`}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#132236] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#0f766e]"
        >
          View Details <FiArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
