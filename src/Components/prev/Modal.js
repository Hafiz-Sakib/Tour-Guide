import { Link } from "react-router-dom";
import { FiCheckCircle, FiX, FiCalendar, FiUsers } from "react-icons/fi";

const Modal = ({ closeModal, service, travelers, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "To be confirmed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/60 backdrop-blur-sm">
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* TOP ACCENT */}
        <div className="h-1 bg-gradient-to-r from-jade to-sage"></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-smoke hover:text-forest transition-colors"
          aria-label="Close modal"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          {/* ICON */}
          <div className="w-16 h-16 bg-mist/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <FiCheckCircle className="w-9 h-9 text-jade" />
          </div>

          {/* TITLE */}
          <h2 className="font-cormorant text-3xl font-semibold text-forest mb-2">
            Booking Confirmed!
          </h2>

          <p className="text-smoke text-sm mb-6">
            Your booking request has been received. I'll contact you shortly to
            finalise the details.
          </p>

          {/* SUMMARY */}
          <div className="bg-cream rounded-sm p-4 text-left space-y-2 mb-6">
            <p className="font-semibold text-forest text-sm">{service?.name}</p>

            <p className="text-smoke text-xs flex items-center gap-1.5">
              <FiCalendar className="text-jade" />
              {formattedDate}
            </p>

            <p className="text-smoke text-xs flex items-center gap-1.5">
              <FiUsers className="text-jade" />
              {travelers} traveler
              {travelers > 1 ? "s" : ""}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="btn-outline flex-1 !py-2.5 !px-4"
            >
              Close
            </button>

            <Link
              to="/"
              className="btn-primary flex-1 !py-2.5 !px-4 justify-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
