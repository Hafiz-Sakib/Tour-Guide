// src/Components/NotFound/NotFound.js
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

const NotFound = () => (
  <main className="min-h-screen bg-[#132236] flex items-center justify-center px-6 pt-[76px] text-white text-center">
    <div className="max-w-lg">
      <FiMapPin className="mx-auto text-7xl text-[#f4c76b] mb-8" />

      <p className="text-[#f4c76b] uppercase tracking-[0.3em] text-sm font-bold mb-4">
        404 — Off Route
      </p>

      <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
        This route is off the itinerary.
      </h1>

      <p className="text-white/70 text-lg mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-3 bg-[#f25f4c] hover:bg-white hover:text-[#132236] px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all"
      >
        <FiArrowLeft /> Back to Home
      </Link>
    </div>
  </main>
);

export default NotFound;
