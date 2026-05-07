// src/Components/Modal.js
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiUsers,
  FiX,
} from "react-icons/fi";

const Modal = ({ closeModal, service, travelers, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "To be confirmed";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#132236]/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 z-10 w-10 h-10 flex items-center justify-center text-[#65758a] hover:text-[#132236] transition"
          aria-label="Close"
        >
          <FiX size={28} />
        </button>

        <div className="p-10 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center bg-[#0f766e]/10 rounded-full text-6xl text-[#0f766e] mb-8">
            <FiCheckCircle />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#132236] mb-3">
            Booking Request Received
          </h2>
          <p className="text-[#65758a] leading-relaxed max-w-xs mx-auto">
            Thank you! Our travel desk will review availability and get back to
            you within 24 hours.
          </p>

          {/* Booking Summary */}
          <div className="mt-10 bg-[#fbf8f2] border border-[#e7dfd0] rounded-2xl p-6 text-left">
            <p className="font-black text-lg text-[#132236] mb-4">
              {service?.name}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-[#0f766e] text-xl" />
                <div>
                  <p className="text-[#65758a] text-xs">Preferred Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiUsers className="text-[#0f766e] text-xl" />
                <div>
                  <p className="text-[#65758a] text-xs">Travelers</p>
                  <p className="font-medium">
                    {travelers} Traveler{travelers > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={closeModal}
              className="py-4 border border-[#e7dfd0] rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#f6f2ea] transition"
            >
              Close
            </button>
            <Link
              to="/"
              className="py-4 bg-[#132236] text-white rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0f766e] transition"
            >
              Back to Home <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
