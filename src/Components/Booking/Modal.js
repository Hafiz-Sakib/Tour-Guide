// src/Components/Booking/Modal.js
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0d1f35]/85 backdrop-blur-xl p-4">
      <div
        className="relative w-full max-w-lg bg-white rounded-[32px] shadow-[0_32px_80px_rgba(13,31,53,0.35)] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] via-[#e8c96a] to-[#0b6b62]" />

        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f0e8] text-[#5a6a7e] hover:text-[#0d1f35] hover:bg-[#e7dfd0] transition-all duration-200"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="p-10 text-center">
          {/* Success icon */}
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-[#0b6b62]/10 border-2 border-[#0b6b62]/20 text-5xl text-[#0b6b62] mb-8 animate-float">
            <FiCheckCircle />
          </div>

          <h2
            className="text-3xl font-black tracking-tight text-[#0d1f35] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Booking Request Received
          </h2>
          <p className="text-[#5a6a7e] leading-relaxed max-w-xs mx-auto text-sm">
            Thank you! Our travel desk will review availability and get back to
            you within 24 hours.
          </p>

          {/* Summary card */}
          <div className="mt-8 bg-[#f5f0e8] border border-[#e7dfd0] rounded-[20px] p-6 text-left">
            <p
              className="font-black text-[#0d1f35] mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {service?.name}
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: <FiCalendar />,
                  label: "Preferred Date",
                  value: formattedDate,
                },
                {
                  icon: <FiUsers />,
                  label: "Travelers",
                  value: `${travelers} Traveler${travelers > 1 ? "s" : ""}`,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0b6b62]/10 flex items-center justify-center text-[#0b6b62]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#5a6a7e] text-[10px] uppercase tracking-widest font-bold">
                      {item.label}
                    </p>
                    <p className="font-semibold text-[#0d1f35] text-sm mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              onClick={closeModal}
              className="py-4 border border-[#e7dfd0] rounded-2xl font-bold text-xs uppercase tracking-widest text-[#5a6a7e] hover:bg-[#f5f0e8] hover:text-[#0d1f35] transition-all duration-200"
            >
              Close
            </button>
            <Link
              to="/"
              className="py-4 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c9a84c]/25 hover:scale-[1.02] transition-all duration-300 btn-glow"
            >
              Back to Home <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
