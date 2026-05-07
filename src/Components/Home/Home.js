// src/Components/Home/Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCompass,
  FiShield,
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
    text: "Licensed guides, vetted stays, and transparent planning from start to finish.",
  },
  {
    icon: <FiCalendar />,
    title: "Seamless Planning",
    text: "Clear schedules, flexible booking, and 24/7 concierge support.",
  },
];

const destinations = [
  {
    name: "Bandarban",
    tag: "Cloud forests, hill trails, waterfalls",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85",
    bestFor: "Adventure Seekers",
    duration: "3-5 Days",
    highlight: "Private hill guide, waterfall picnic, sunrise viewpoint",
  },
  {
    name: "Rangamati",
    tag: "Lake cruises, culture, calm escapes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    bestFor: "Culture & Slow Travel",
    duration: "2-4 Days",
    highlight: "Kaptai Lake cruise, local lunch, artisan village visit",
  },
  {
    name: "Cox's Bazar",
    tag: "Beach retreats and sunset stays",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&q=85",
    bestFor: "Families & Beach Lovers",
    duration: "3-6 Days",
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

const stats = [
  { number: "12000", label: "Happy Travelers" },
  { number: "98", label: "Repeat Clients", suffix: "%" },
  { number: "4.9", label: "Average Rating" },
  { number: "24", label: "Hour Support" },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(4);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeDestination = destinations[selectedDestination];
  const activeStyle = tripStyles[selectedStyle];
  const estimate = travelers * days * activeStyle.multiplier;

  // Stats animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) setShowStats(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#f6f2ea] text-[#132236]">
      {/* ====================== HERO ====================== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#132236]">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=2000&q=90"
          alt="Bangladesh Landscape"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#132236]/90 via-[#132236]/70 to-[#132236]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-3 text-[#f4c76b] font-bold tracking-[0.25em] text-sm mb-6">
              BESPOKE BANGLADESH TRAVEL
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-[82px] font-black leading-[1.05] tracking-tighter text-white mb-8">
              Luxury journeys,
              <br />
              <span className="text-[#f4c76b]">planned with soul.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mb-10">
              Private tours, family escapes, and cultural adventures across
              Bangladesh — designed with care and executed with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="group px-10 py-5 bg-[#f25f4c] text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 rounded-full hover:bg-white hover:text-[#132236] transition-all duration-300 hover:scale-105"
              >
                Explore Packages
                <FiArrowRight className="group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 border-2 border-white/60 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition text-center"
              >
                Start Planning
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/60 text-xs tracking-widest">
          SCROLL TO DISCOVER
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent mt-3" />
        </div>
      </section>

      {/* ====================== PILLARS ====================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group p-10 border border-[#e7dfd0] rounded-3xl hover:border-[#0f766e] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="text-5xl text-[#0f766e] mb-8 group-hover:scale-110 transition-transform duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-3xl font-black mb-4">{pillar.title}</h3>
                <p className="text-[#65758a] leading-relaxed">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== INTERACTIVE PLANNER ====================== */}
      <section className="py-20 bg-[#f6f2ea]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold mb-3">
                Live Planner
              </p>
              <h2 className="text-5xl font-black leading-tight">
                Shape your perfect journey
              </h2>
              <p className="mt-6 text-lg text-[#65758a]">
                Adjust options and see the estimate update instantly.
              </p>
            </div>

            <div className="bg-white border border-[#e7dfd0] rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-64 md:h-80 lg:h-96">
                <img
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-4xl font-black">
                    {activeDestination.name}
                  </h3>
                  <p className="text-[#f4c76b] mt-1">
                    {activeDestination.highlight}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* Destination Selection */}
                <div>
                  <p className="uppercase text-xs tracking-widest text-[#65758a] mb-4">
                    Destination
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {destinations.map((dest, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDestination(i)}
                        className={`p-4 rounded-2xl text-sm font-medium transition-all ${
                          selectedDestination === i
                            ? "bg-[#132236] text-white"
                            : "bg-[#fbf8f2] hover:bg-white border border-[#e7dfd0]"
                        }`}
                      >
                        {dest.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style & Counters */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="uppercase text-xs tracking-widest text-[#65758a] mb-4">
                      Travel Style
                    </p>
                    {tripStyles.map((style, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedStyle(i)}
                        className={`w-full p-4 rounded-2xl text-left mb-3 transition-all ${
                          selectedStyle === i
                            ? "bg-[#132236] text-white"
                            : "hover:bg-[#fbf8f2] border border-transparent"
                        }`}
                      >
                        <p className="font-bold">{style.name}</p>
                        <p className="text-xs opacity-70">{style.pace}</p>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        label: "Travelers",
                        value: travelers,
                        setter: setTravelers,
                        min: 1,
                        max: 12,
                      },
                      {
                        label: "Days",
                        value: days,
                        setter: setDays,
                        min: 2,
                        max: 14,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="uppercase text-xs tracking-widest text-[#65758a] mb-3">
                          {item.label}
                        </p>
                        <div className="flex items-center bg-[#fbf8f2] rounded-2xl p-4">
                          <button
                            onClick={() =>
                              item.setter(Math.max(item.min, item.value - 1))
                            }
                            className="w-11 h-11 flex items-center justify-center text-2xl border rounded-xl hover:bg-white active:scale-95"
                          >
                            −
                          </button>
                          <span className="flex-1 text-center text-4xl font-black">
                            {item.value}
                          </span>
                          <button
                            onClick={() =>
                              item.setter(Math.min(item.max, item.value + 1))
                            }
                            className="w-11 h-11 flex items-center justify-center text-2xl border rounded-xl hover:bg-white active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimate */}
                <div className="bg-[#132236] text-white p-8 rounded-3xl text-center">
                  <p className="uppercase text-xs tracking-widest opacity-60">
                    Estimated from
                  </p>
                  <p className="text-5xl font-black mt-2">
                    {" "}
                    ${estimate.toLocaleString()}{" "}
                  </p>
                  <p className="text-sm mt-2 opacity-70">
                    {travelers} travelers • {days} days • {activeStyle.name}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-5 bg-[#f25f4c] hover:bg-[#d94f3d] text-center text-white font-black uppercase tracking-widest rounded-3xl transition text-lg"
                >
                  Request This Itinerary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== STATS ====================== */}
      <section className="bg-[#132236] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              >
                <p className="text-6xl font-black text-[#f4c76b]">
                  {stat.number}
                  {stat.suffix}
                </p>
                <p className="mt-4 text-lg text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SIGNATURE DESTINATIONS ====================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              Signature Destinations
            </p>
            <h2 className="text-5xl font-black mt-3">
              Where will your next story begin?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <div
                key={i}
                onClick={() => setSelectedDestination(i)}
                className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30" />
                <div className="absolute bottom-0 p-8 text-white w-full">
                  <p className="text-xs tracking-widest text-[#f4c76b]">
                    {dest.duration}
                  </p>
                  <h3 className="text-4xl font-black mt-2">{dest.name}</h3>
                  <p className="text-white/80 mt-2 line-clamp-2">{dest.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FEATURED PACKAGES ====================== */}
      <section className="bg-[#132236] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <p className="text-[#f4c76b] uppercase tracking-widest text-sm font-bold">
                Featured This Season
              </p>
              <h2 className="text-5xl font-black">Handpicked Journeys</h2>
            </div>
            <Link
              to="/services"
              className="text-[#f4c76b] font-black flex items-center gap-2 hover:text-white transition"
            >
              Browse All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin border-4 border-white/20 border-t-[#f4c76b] rounded-full" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.slice(0, 2).map((service) => (
                <ServiceCard key={service.id} service={service} dark />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====================== HOW IT WORKS ====================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
                Process
              </p>
              <h2 className="text-5xl font-black leading-tight mt-4">
                From idea to unforgettable journey in three steps
              </h2>
            </div>
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#132236] text-white flex items-center justify-center font-black text-3xl">
                    {index + 1}
                  </div>
                  <p className="text-[17px] leading-relaxed text-[#65758a] pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA ====================== */}
      <section className="relative py-28 bg-[#0f766e] text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=85"
          alt="Planning"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-5xl">
            <FiCheckCircle />
          </div>
          <h2 className="text-5xl font-black tracking-tight">
            Ready for a better-planned trip?
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Tell us your dream destination. Our team will craft something
            extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/contact"
              className="px-10 py-5 bg-white text-[#0f766e] font-black uppercase tracking-widest rounded-full hover:bg-[#f4c76b] hover:text-white transition"
            >
              Start Planning Now
            </Link>
            <Link
              to="/register"
              className="px-10 py-5 border-2 border-white/70 hover:border-white font-bold uppercase tracking-widest rounded-full transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <Review />
    </main>
  );
};

export default Home;
