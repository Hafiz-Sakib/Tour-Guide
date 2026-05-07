// src/Components/Booking.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiClock,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import Modal from "./Modal";

const inclusions = [
  "Dedicated trip coordinator",
  "Vetted local guide & driver",
  "Flexible travel date request",
  "Detailed itinerary planning",
  "Safety briefing & support",
  "24/7 on-trip assistance",
];

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
      .then((res) => res.json())
      .then((data) => {
        setService(
          data.find((item) => String(item.id) === String(bookingId)) || null,
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookingId]);

  const confirmBooking = () => {
    if (!date) {
      setFormError("Please select your preferred travel date.");
      return;
    }
    setFormError("");
    setOpenModal(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f2ea]">
        <div className="h-14 w-14 animate-spin border-4 border-[#e7dfd0] border-t-[#0f766e] rounded-full" />
      </main>
    );
  }

  if (!service) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#f6f2ea] px-6 text-center">
        <h1 className="text-5xl font-black">Package Not Found</h1>
        <p className="mt-4 text-[#65758a]">
          Sorry, the tour you're looking for is no longer available.
        </p>
        <Link
          to="/services"
          className="mt-8 px-8 py-4 bg-[#132236] text-white rounded-2xl font-bold"
        >
          Browse All Packages
        </Link>
      </main>
    );
  }

  const price =
    parseFloat(String(service.balance).replace(/[^0-9.]/g, "")) || 0;
  const total = (price * travelers).toFixed(0);

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      <section className="max-w-7xl mx-auto px-6 py-12 lg:px-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0f766e] mb-8 hover:text-[#132236]"
        >
          ← Back to All Packages
        </Link>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">
          {/* Left Content */}
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-[#132236] shadow-xl">
              <img
                src={service.picture}
                alt={service.name}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-8 text-white">
                <p className="uppercase tracking-[0.2em] text-[#f4c76b] text-sm font-bold">
                  Curated Experience
                </p>
                <h1 className="text-4xl font-black mt-2 leading-tight">
                  {service.name}
                </h1>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FiStar className="text-3xl" />,
                  label: "Guest Rating",
                  value: "4.9/5",
                },
                {
                  icon: <FiClock className="text-3xl" />,
                  label: "Duration",
                  value: "Flexible",
                },
                {
                  icon: <FiShield className="text-3xl" />,
                  label: "Support",
                  value: "24/7 Concierge",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-[#e7dfd0] bg-white p-6 rounded-3xl text-center"
                >
                  <div className="text-[#0f766e] mb-4">{item.icon}</div>
                  <p className="font-black text-xl">{item.value}</p>
                  <p className="text-sm text-[#65758a] mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Trip Overview */}
            <div className="mt-12 border border-[#e7dfd0] bg-white p-8 rounded-3xl">
              <h2 className="text-3xl font-black mb-6">Trip Overview</h2>
              <p className="text-[#65758a] leading-relaxed">{service.about}</p>

              <div className="mt-10">
                <h3 className="font-bold uppercase tracking-widest text-sm mb-5 text-[#0f766e]">
                  What's Included
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {inclusions.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded bg-[#0f766e]/10 flex items-center justify-center text-[#0f766e]">
                        <FiCheck size={14} />
                      </div>
                      <p className="text-sm text-[#65758a]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-[#e7dfd0] bg-white rounded-3xl p-8 shadow-xl">
              <p className="uppercase text-xs tracking-widest text-[#65758a]">
                Starting from
              </p>
              <p className="text-5xl font-black text-[#f25f4c] mt-1">
                {service.balance}
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-3">
                    Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-[#e7dfd0] bg-[#fbf8f2] rounded-2xl px-5 py-4 focus:border-[#0f766e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-3">
                    Number of Travelers
                  </label>
                  <div className="flex items-center bg-[#fbf8f2] rounded-2xl p-2">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-12 h-12 text-3xl hover:bg-white rounded-xl"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-4xl font-black">
                      {travelers}
                    </span>
                    <button
                      onClick={() => setTravelers(Math.min(20, travelers + 1))}
                      className="w-12 h-12 text-3xl hover:bg-white rounded-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#fbf8f2] border border-[#e7dfd0] rounded-2xl p-6">
                <div className="flex justify-between text-sm">
                  <span>
                    {service.balance} × {travelers}
                  </span>
                  <span className="font-bold">BDT {total}</span>
                </div>
                <div className="border-t border-[#e7dfd0] mt-4 pt-4 flex justify-between font-black text-lg">
                  <span>Total Estimate</span>
                  <span>BDT {total}</span>
                </div>
              </div>

              {formError && (
                <p className="text-red-600 text-sm mt-4">{formError}</p>
              )}

              <button
                onClick={confirmBooking}
                className="mt-8 w-full py-5 bg-[#f25f4c] hover:bg-[#d94f3d] text-white font-black uppercase tracking-widest rounded-2xl transition text-lg"
              >
                Confirm Booking Request
              </button>

              <p className="text-center text-xs text-[#65758a] mt-4">
                No payment required at this stage
              </p>
            </div>
          </aside>
        </div>
      </section>

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
