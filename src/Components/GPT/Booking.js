import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiCheck, FiClock, FiShield, FiStar, FiUsers } from "react-icons/fi";
import Modal from "./Modal";

const inclusions = [
  "Dedicated trip coordinator",
  "Vetted local guide",
  "Flexible travel date request",
  "Itinerary planning support",
  "Safety and route briefing",
  "24/7 assistance during travel",
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
    fetch("https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json")
      .then((response) => response.json())
      .then((data) => {
        setService(data.find((item) => String(item.id) === String(bookingId)) || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bookingId]);

  const confirmBooking = () => {
    if (!date) {
      setFormError("Please select a preferred travel date.");
      return;
    }
    setFormError("");
    setOpenModal(true);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f2ea]">
        <div className="h-12 w-12 animate-spin border-2 border-[#e7dfd0] border-t-[#0f766e]" />
      </main>
    );
  }

  if (!service) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f2ea] px-6 text-center text-[#132236]">
        <h1 className="text-4xl font-black">Package not found</h1>
        <p className="mt-3 text-sm text-[#65758a]">The package you are looking for is no longer available.</p>
        <Link to="/services" className="mt-8 bg-[#132236] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
          Browse Packages
        </Link>
      </main>
    );
  }

  const price = parseFloat(String(service.balance).replace(/[^0-9.]/g, "")) || 0;
  const total = (price * travelers).toFixed(2);

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">
          <FiArrowLeft /> Back to packages
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="relative overflow-hidden bg-[#132236]">
              <img src={service.picture} alt={service.name} className="h-[460px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132236]/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-7 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f4c76b]">Curated Package</p>
                <h1 className="mt-3 text-5xl font-black tracking-tight">{service.name}</h1>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: <FiStar />, label: "Rating", value: "4.9 guest score" },
                { icon: <FiClock />, label: "Pace", value: "Flexible duration" },
                { icon: <FiShield />, label: "Support", value: "Concierge assisted" },
              ].map((item) => (
                <div key={item.label} className="border border-[#e7dfd0] bg-white p-5">
                  <div className="mb-3 text-2xl text-[#0f766e]">{item.icon}</div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">{item.label}</p>
                  <p className="mt-1 font-black">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-[#e7dfd0] bg-white p-7">
              <h2 className="text-3xl font-black tracking-tight">Trip overview</h2>
              <p className="mt-4 text-sm leading-7 text-[#65758a]">{service.about}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {inclusions.map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm font-semibold text-[#65758a]">
                    <span className="flex h-6 w-6 items-center justify-center bg-[#0f766e]/10 text-[#0f766e]">
                      <FiCheck />
                    </span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit border border-[#e7dfd0] bg-white p-7 shadow-xl lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#65758a]">Starting from</p>
            <p className="mt-2 text-4xl font-black text-[#f25f4c]">{service.balance}</p>
            <p className="mt-1 text-sm text-[#65758a]">per traveler, final price confirmed by concierge</p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                  <FiCalendar className="text-[#0f766e]" /> Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full border border-[#e7dfd0] bg-[#fbf8f2] px-4 py-4 text-sm focus:border-[#0f766e] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                  <FiUsers className="text-[#0f766e]" /> Travelers
                </label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="h-11 w-11 border border-[#e7dfd0] text-xl font-black">-</button>
                  <span className="w-10 text-center text-xl font-black">{travelers}</span>
                  <button onClick={() => setTravelers(Math.min(20, travelers + 1))} className="h-11 w-11 border border-[#e7dfd0] text-xl font-black">+</button>
                </div>
              </div>
            </div>

            <div className="mt-7 border border-[#e7dfd0] bg-[#fbf8f2] p-5">
              <div className="flex justify-between text-sm text-[#65758a]">
                <span>{service.balance} x {travelers}</span>
                <span>${total}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-[#e7dfd0] pt-3 font-black">
                <span>Estimated total</span>
                <span>${total}</span>
              </div>
            </div>

            {formError && <p className="mt-4 border border-[#f25f4c]/30 bg-[#f25f4c]/10 px-4 py-3 text-xs font-bold text-[#d94f3d]">{formError}</p>}

            <button onClick={confirmBooking} className="mt-6 w-full bg-[#f25f4c] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#d94f3d]">
              Request Booking
            </button>
            <p className="mt-3 text-center text-xs text-[#65758a]">No payment required for this request.</p>
          </aside>
        </div>
      </section>

      {openModal && <Modal closeModal={() => setOpenModal(false)} service={service} travelers={travelers} date={date} />}
    </main>
  );
};

export default Booking;
