import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiCheckCircle, FiUsers, FiX } from "react-icons/fi";

const Modal = ({ closeModal, service, travelers, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "To be confirmed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132236]/76 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md border border-[#e7dfd0] bg-white shadow-2xl">
        <button onClick={closeModal} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-[#e7dfd0] text-[#65758a]" aria-label="Close">
          <FiX />
        </button>
        <div className="p-8 pt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#0f766e]/10 text-4xl text-[#0f766e]">
            <FiCheckCircle />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-[#132236]">Request received</h2>
          <p className="mt-3 text-sm leading-7 text-[#65758a]">
            Our travel desk will review availability and contact you with the next step.
          </p>

          <div className="mt-7 border border-[#e7dfd0] bg-[#fbf8f2] p-5 text-left">
            <p className="font-black text-[#132236]">{service?.name}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#65758a]">
              <FiCalendar className="text-[#0f766e]" /> {formattedDate}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#65758a]">
              <FiUsers className="text-[#0f766e]" /> {travelers} traveler{travelers > 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button onClick={closeModal} className="border border-[#e7dfd0] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#132236]">
              Close
            </button>
            <Link to="/" className="inline-flex items-center justify-center gap-2 bg-[#132236] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
              Home <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
