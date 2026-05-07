import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCompass,
  FiMinus,
  FiMapPin,
  FiPlus,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import ServiceCard from "../Services/ServiceCard";
import Review from "./Review";

const pillars = [
  {
    icon: <FiCompass />,
    title: "Tailored Itineraries",
    text: "Every trip is designed around your pace, budget, dates, and travel style.",
  },
  {
    icon: <FiShield />,
    title: "Trusted Local Experts",
    text: "Licensed guides, vetted stays, and transparent planning from first call to return.",
  },
  {
    icon: <FiCalendar />,
    title: "Seamless Planning",
    text: "Clear schedules, flexible booking, and concierge support throughout the journey.",
  },
];

const destinations = [
  {
    name: "Bandarban",
    tag: "Cloud forests, hill trails, waterfalls",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
    bestFor: "Adventure seekers",
    duration: "3-5 days",
    highlight: "Private hill guide, waterfall picnic, sunrise viewpoint",
  },
  {
    name: "Rangamati",
    tag: "Lake cruises, culture, calm escapes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    bestFor: "Culture and slow travel",
    duration: "2-4 days",
    highlight: "Kaptai Lake cruise, local lunch, artisan village visit",
  },
  {
    name: "Cox's Bazar",
    tag: "Beach retreats and sunset stays",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&q=85",
    bestFor: "Families and beach lovers",
    duration: "3-6 days",
    highlight: "Oceanfront stay, sunset dinner, island day trip",
  },
];

const tripStyles = [
  {
    name: "Relaxed",
    pace: "Slow mornings, scenic transfers, premium stays",
    multiplier: 145,
  },
  {
    name: "Adventure",
    pace: "Guided trails, early starts, local experiences",
    multiplier: 118,
  },
  {
    name: "Luxury",
    pace: "Private transport, upgraded rooms, concierge extras",
    multiplier: 210,
  },
];

const process = [
  "Share your preferred dates, group size, and travel mood.",
  "Receive a curated itinerary with stays, transport, and experiences.",
  "Confirm the journey and travel with our support team on standby.",
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(4);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeDestination = destinations[selectedDestination];
  const activeStyle = tripStyles[selectedStyle];
  const estimate = travelers * days * activeStyle.multiplier;

  return (
    <main className="bg-[#f6f2ea] text-[#132236]">
      <section className="relative min-h-[92vh] overflow-hidden bg-[#132236] pt-24">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1800&q=90"
          alt="Premium mountain travel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236]/95 via-[#132236]/72 to-[#132236]/24" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#132236] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(92vh-6rem)] max-w-7xl items-center px-6 py-16 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f4c76b] backdrop-blur">
              Bespoke Bangladesh Travel
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl">
              Luxury journeys, planned with local precision.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Sababa Tours designs private escapes, guided adventures, and
              cultural itineraries across Bangladesh for travelers who want
              every detail handled beautifully.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-[#f25f4c] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d94f3d]"
              >
                Explore Packages <FiArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white hover:bg-white/10"
              >
                Plan a Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-[#e7dfd0] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-[#0f766e]/10 text-2xl text-[#0f766e]">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black text-[#132236]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#65758a]">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f2ea] py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f766e]/25 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
              Interactive Planner
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#132236] md:text-5xl">
              Shape a trip before you even send a message.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#65758a]">
              Choose a destination, travel style, group size, and trip length.
              The estimate updates instantly so you can explore different
              possibilities.
            </p>
          </div>

          <div className="planner-shell border border-[#e7dfd0] bg-white p-4 shadow-2xl shadow-[#132236]/10 md:p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <div className="relative min-h-[360px] overflow-hidden bg-[#132236] md:min-h-[430px]">
                  <img
                    src={activeDestination.image}
                    alt={activeDestination.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132236]/92 via-[#132236]/22 to-transparent" />
                  <div className="absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-5">
                    <span className="bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#0f766e] backdrop-blur">
                      {activeDestination.duration}
                    </span>
                    <span className="bg-[#f25f4c] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                      Live Preview
                    </span>
                  </div>
                  <div className="absolute bottom-0 max-w-xl p-6 text-white md:p-8">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f4c76b]">
                      {activeDestination.bestFor}
                    </p>
                    <h3 className="mt-2 text-4xl font-black leading-none md:text-5xl">
                      {activeDestination.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/76">
                      {activeDestination.highlight}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {destinations.map((destination, index) => (
                    <button
                      key={destination.name}
                      onClick={() => setSelectedDestination(index)}
                      className={`planner-choice min-h-[94px] border p-4 text-left transition ${
                        selectedDestination === index
                          ? "border-[#0f766e] bg-[#0f766e] text-white"
                          : "border-[#e7dfd0] bg-[#fbf8f2] text-[#132236] hover:-translate-y-0.5 hover:border-[#0f766e] hover:bg-white"
                      }`}
                      type="button"
                    >
                      <span className="block break-words text-sm font-black leading-5">
                        {destination.name}
                      </span>
                      <span
                        className={`mt-2 block break-words text-[11px] font-bold leading-4 ${selectedDestination === index ? "text-white/75" : "text-[#65758a]"}`}
                      >
                        {destination.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="planner-control-panel border border-[#e7dfd0] bg-[#fbf8f2] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">
                  Trip Mood
                </p>
                <div className="mt-4 grid gap-3">
                  {tripStyles.map((style, index) => (
                    <button
                      key={style.name}
                      onClick={() => setSelectedStyle(index)}
                      className={`planner-choice border p-4 text-left transition ${
                        selectedStyle === index
                          ? "border-[#132236] bg-[#132236] text-white"
                          : "border-[#e7dfd0] bg-white text-[#132236] hover:-translate-y-0.5 hover:border-[#132236]"
                      }`}
                      type="button"
                    >
                      <span className="block text-sm font-black">
                        {style.name}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-5 ${selectedStyle === index ? "text-white/68" : "text-[#65758a]"}`}
                      >
                        {style.pace}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Travelers",
                      value: travelers,
                      set: setTravelers,
                      min: 1,
                      max: 12,
                    },
                    {
                      label: "Days",
                      value: days,
                      set: setDays,
                      min: 2,
                      max: 14,
                    },
                  ].map((control) => (
                    <div
                      key={control.label}
                      className="border border-[#e7dfd0] bg-white p-4"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#65758a]">
                        {control.label}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={() =>
                            control.set(
                              Math.max(control.min, control.value - 1),
                            )
                          }
                          disabled={control.value === control.min}
                          className="flex h-9 w-9 items-center justify-center border border-[#e7dfd0] text-[#132236] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:cursor-not-allowed disabled:opacity-35"
                          type="button"
                          aria-label={`Decrease ${control.label}`}
                        >
                          <FiMinus />
                        </button>
                        <span className="text-xl font-black">
                          {control.value}
                        </span>
                        <button
                          onClick={() =>
                            control.set(
                              Math.min(control.max, control.value + 1),
                            )
                          }
                          disabled={control.value === control.max}
                          className="flex h-9 w-9 items-center justify-center border border-[#e7dfd0] text-[#132236] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:cursor-not-allowed disabled:opacity-35"
                          type="button"
                          aria-label={`Increase ${control.label}`}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-[#132236] p-5 text-white shadow-xl shadow-[#132236]/20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                    Estimated from
                  </p>
                  <p className="mt-1 text-4xl font-black">
                    ${estimate.toLocaleString()}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/58">
                    For {travelers} traveler{travelers > 1 ? "s" : ""}, {days}{" "}
                    days, {activeStyle.name.toLowerCase()} pace.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#f25f4c] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-[#f25f4c]/20 transition hover:-translate-y-0.5 hover:bg-[#d94f3d]"
                >
                  Request This Plan <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
                Signature Destinations
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#132236] md:text-5xl">
                Designed for travelers who notice the details.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#f25f4c]"
            >
              View all trips <FiArrowRight />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                onClick={() =>
                  setSelectedDestination(
                    destinations.findIndex(
                      (item) => item.name === destination.name,
                    ),
                  )
                }
                className="group relative min-h-[430px] overflow-hidden bg-[#132236] text-left"
                type="button"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132236]/92 via-[#132236]/18 to-transparent" />
                <div className="absolute bottom-0 p-7 text-white">
                  <FiMapPin className="mb-4 text-2xl text-[#f4c76b]" />
                  <h3 className="text-3xl font-black">{destination.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {destination.tag}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#f4c76b]">
                    Preview in planner <FiArrowRight />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#132236] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1fr] lg:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">
              Featured Packages
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Handpicked trips for this season.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/60">
              Choose a ready-made package or use it as the starting point for a
              fully custom itinerary.
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin border-2 border-white/20 border-t-[#f4c76b]" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {services.slice(0, 2).map((service) => (
                <ServiceCard key={service.id} service={service} dark />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
              How It Works
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#132236] md:text-5xl">
              From idea to itinerary in three clear steps.
            </h2>
          </div>
          <div className="space-y-4">
            {process.map((step, index) => (
              <div
                key={step}
                className="flex gap-5 border border-[#e7dfd0] bg-[#fbf8f2] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#132236] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-[#65758a]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0f766e] py-20">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=85"
          alt="Travel planning desk"
          className="absolute inset-0 h-full w-full object-cover opacity-18"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-white/14 text-2xl">
            <FiCheckCircle />
          </div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Ready for a better-planned trip?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/78">
            Tell us your dream destination, and our team will shape it into a
            practical, elegant travel plan.
          </p>
          <div className="mt-9 flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#132236]"
            >
              Start Planning <FiArrowRight />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 border border-white/35 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
            >
              Create Account <FiUsers />
            </Link>
          </div>
        </div>
      </section>

      <Review />
    </main>
  );
};

export default Home;
