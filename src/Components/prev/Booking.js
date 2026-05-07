import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiStar, FiCalendar, FiUsers, FiMapPin, FiCheck } from "react-icons/fi";

import Modal from "./Modal";

const Booking = () => {
  const { bookingId } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((r) => r.json())
      .then((data) => {
        const matched = data.find((s) => String(s.id) === String(bookingId));

        setService(matched || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookingId]);

  const handleConfirm = () => {
    if (!date) {
      setFormError("Please select a travel date.");
      return;
    }

    if (travelers < 1) {
      setFormError("At least 1 traveler is required.");
      return;
    }

    setFormError("");
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="w-10 h-10 border-2 border-jade border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-center px-6">
        <p className="font-cormorant text-4xl font-semibold text-forest mb-4">
          Tour not found
        </p>

        <p className="text-smoke mb-8">
          The package you're looking for doesn't exist.
        </p>

        <Link to="/services" className="btn-primary">
          Browse Packages
        </Link>
      </div>
    );
  }

  const { name, balance, picture, about } = service;

  const numericPrice = parseFloat(String(balance).replace(/[^0-9.]/g, "")) || 0;

  const totalPrice = (numericPrice * travelers).toFixed(2);

  return (
    <main className="pt-[72px] min-h-screen bg-cream">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-smoke mb-10">
          <Link to="/" className="hover:text-jade transition-colors">
            Home
          </Link>

          <span>/</span>

          <Link to="/services" className="hover:text-jade transition-colors">
            Services
          </Link>

          <span>/</span>

          <span className="text-forest font-medium">{name}</span>
        </nav>

        <div className="grid md:grid-cols-5 gap-10">
          {/* LEFT */}
          <div className="md:col-span-3">
            <div className="rounded-sm overflow-hidden mb-6">
              <img
                src={picture}
                alt={name}
                className="w-full h-72 object-cover"
              />
            </div>

            <span className="badge mb-3">Tour Package</span>

            <h1 className="font-cormorant text-4xl font-semibold text-forest mb-3">
              {name}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar
                  key={i}
                  className="w-4 h-4 text-gold"
                  style={{ fill: "#e4a63a" }}
                />
              ))}

              <span className="text-smoke text-xs ml-2">
                5.0 · Premium package
              </span>
            </div>

            <p className="text-smoke text-sm leading-relaxed mb-6">{about}</p>

            {/* INCLUSIONS */}
            <div className="bg-white border border-sand rounded-sm p-5">
              <h3 className="font-semibold text-forest text-sm mb-4">
                What's included
              </h3>

              <ul className="space-y-2">
                {[
                  "Expert licensed guide",
                  "Safety equipment provided",
                  "Emergency first-aid kit",
                  "Detailed route map",
                  "24/7 guide contact",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-smoke"
                  >
                    <FiCheck className="text-jade w-4 h-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2">
            <div className="bg-white border border-sand rounded-sm p-6 sticky top-24">
              <p className="font-cormorant text-3xl font-bold text-forest mb-1">
                {balance}
              </p>

              <p className="text-smoke text-xs mb-6">per person</p>

              <div className="space-y-4 mb-5">
                {/* DATE */}
                <div>
                  <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                    <FiCalendar className="inline mr-1.5 mb-0.5" />
                    Travel Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* TRAVELERS */}
                <div>
                  <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                    <FiUsers className="inline mr-1.5 mb-0.5" />
                    Travelers
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-9 h-9 rounded-sm border border-sand flex items-center justify-center text-lg hover:border-jade transition-colors"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {travelers}
                    </span>

                    <button
                      onClick={() => setTravelers(Math.min(20, travelers + 1))}
                      className="w-9 h-9 rounded-sm border border-sand flex items-center justify-center text-lg hover:border-jade transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div className="border-t border-sand pt-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm text-smoke">
                  <span>
                    {balance} × {travelers} traveler
                    {travelers > 1 ? "s" : ""}
                  </span>

                  <span>${totalPrice}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-forest">
                  <span>Total</span>

                  <span>${totalPrice}</span>
                </div>
              </div>

              {formError && (
                <p className="text-amber text-xs mb-3 flex items-center gap-1">
                  <FiMapPin className="shrink-0" />
                  {formError}
                </p>
              )}

              <button
                onClick={handleConfirm}
                className="btn-primary w-full justify-center"
              >
                Confirm Booking
              </button>

              <p className="text-smoke text-xs text-center mt-3">
                No payment required to confirm
              </p>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal
          closeModal={() => setOpenModal(false)}
          service={service}
          travelers={travelers}
          date={date}
        />
      )}
    </main>
  );
};

export default Booking;
