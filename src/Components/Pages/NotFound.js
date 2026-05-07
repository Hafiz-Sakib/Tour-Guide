import { Link } from "react-router-dom";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-[#132236] px-6 pt-[76px] text-center text-white">
    <div className="max-w-xl">
      <FiMapPin className="mx-auto mb-6 text-5xl text-[#f4c76b]" />
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">404</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight">This route is off the itinerary.</h1>
      <p className="mt-5 text-sm leading-7 text-white/65">
        The page you are looking for is unavailable. Return to the home page and continue planning your trip.
      </p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-[#f25f4c] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
        <FiArrowLeft /> Back Home
      </Link>
    </div>
  </main>
);

export default NotFound;
