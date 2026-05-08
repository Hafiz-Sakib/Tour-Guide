// src/Components/Home/Home.js
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCompass,
  FiShield,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import ServiceCard from "../Services/ServiceCard";
import Review from "./Review";

/* ─────────────────────────── data ─────────────────────────── */
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
    duration: "3–5 Days",
    highlight: "Private hill guide · waterfall picnic · sunrise viewpoint",
  },
  {
    name: "Rangamati",
    tag: "Lake cruises, culture, calm escapes",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    bestFor: "Culture & Slow Travel",
    duration: "2–4 Days",
    highlight: "Kaptai Lake cruise · local lunch · artisan village",
  },
  {
    name: "Cox's Bazar",
    tag: "Beach retreats and sunset stays",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900&q=85",
    bestFor: "Families & Beach Lovers",
    duration: "3–6 Days",
    highlight: "Oceanfront stay · sunset dinner · island day trip",
  },
];

const tripStyles = [
  {
    name: "Relaxed",
    pace: "Slow mornings · scenic transfers · premium stays",
    multiplier: 145,
  },
  {
    name: "Adventure",
    pace: "Guided trails · early starts · local experiences",
    multiplier: 118,
  },
  {
    name: "Luxury",
    pace: "Private transport · upgraded rooms · concierge",
    multiplier: 210,
  },
];

const process = [
  "Share your preferred dates, group size, and travel mood.",
  "Receive a curated itinerary with stays, transport, and experiences.",
  "Confirm the journey and travel with our support team on standby.",
];

const stats = [
  { number: "12K+", label: "Happy Travelers", icon: <FiUsers /> },
  { number: "98%", label: "Repeat Clients", icon: <FiCheckCircle /> },
  { number: "4.9", label: "Average Rating", icon: "★" },
  { number: "24/7", label: "Concierge Support", icon: <FiShield /> },
];

/* ─────────────────────────── helpers ─────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────── component ─────────────────────────── */
const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDest, setSelectedDest] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(4);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const pillarsRef = useReveal();
  const statsRef = useReveal();
  const destRef = useReveal();
  const processRef = useReveal();
  const plannerRef = useReveal();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((r) => r.json())
      .then((d) => {
        setServices(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    const t = setTimeout(() => setHeroLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const activeDest = destinations[selectedDest];
  console.log(activeDest);
  const activeStyle = tripStyles[selectedStyle];
  const estimate = travelers * days * activeStyle.multiplier;

  return (
    <main className="bg-[#f5f0e8] text-[#0d1f35] overflow-x-hidden">
      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0d1f35]">
        {/* Background image */}
        <div className="absolute inset-0 img-zoom">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=2000&q=90"
            alt="Bangladesh Landscape"
            className="w-full h-full object-cover scale-105"
            style={{
              transition: "transform 8s var(--ease-expo)",
              transform: heroLoaded ? "scale(1)" : "scale(1.05)",
            }}
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f35]/95 via-[#0b6b62]/70 to-[#0d1f35]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/80 via-transparent to-transparent" />

        {/* Decorative ring */}
        <div className="absolute right-[-10%] top-[15%] w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slow" />
        <div
          className="absolute right-[-5%] top-[20%] w-[400px] h-[400px] rounded-full border border-[#c9a84c]/8 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "14s" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-20">
          <div className="max-w-3xl">
            <p
              className={`inline-flex items-center gap-3 text-[#c9a84c] font-bold tracking-[0.28em] text-xs mb-8 animate-fade-in`}
            >
              <span className="w-8 h-px bg-[#c9a84c]" />
              BESPOKE BANGLADESH TRAVEL
              <span className="w-8 h-px bg-[#c9a84c]" />
            </p>

            <h1
              className="animate-fade-up text-5xl md:text-7xl lg:text-[84px] font-black leading-[1.03] tracking-tighter text-white mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Luxury journeys,
              <br />
              <em className="text-shimmer not-italic">planned with soul.</em>
            </h1>

            <p className="animate-fade-up delay-200 text-lg text-white/75 max-w-xl mb-12 leading-relaxed">
              Private tours, family escapes, and cultural adventures across
              Bangladesh — crafted with care and delivered with precision.
            </p>

            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="group relative px-10 py-5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 rounded-full hover:shadow-xl hover:shadow-[#c9a84c]/30 hover:scale-105 transition-all duration-400 btn-glow overflow-hidden"
              >
                Explore Packages
                <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="group px-10 py-5 glass border-white/25 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/15 hover:border-white/40 transition-all duration-300 text-center"
              >
                Start Planning
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="animate-fade-up delay-500 mt-16 flex flex-wrap gap-8">
              {[
                ["12K+", "Travelers"],
                ["4.9★", "Rating"],
                ["98%", "Return Rate"],
              ].map(([n, l]) => (
                <div key={l} className="flex items-center gap-3">
                  <span
                    className="text-2xl font-black text-[#c9a84c]"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {n}
                  </span>
                  <span className="text-white/50 text-sm">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[0.3em] animate-fade-in delay-700">
          SCROLL
          <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════ PILLARS ══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={pillarsRef} className="reveal grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group relative p-10 border border-[#e7dfd0] rounded-[28px] hover:border-[#c9a84c]/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-premium overflow-hidden"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                {/* Subtle gold gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/0 to-[#c9a84c]/0 group-hover:from-[#c9a84c]/4 group-hover:to-transparent transition-all duration-500 rounded-[28px]" />

                <div className="relative text-4xl text-[#0b6b62] mb-8 group-hover:scale-110 group-hover:text-[#c9a84c] transition-all duration-400">
                  {pillar.icon}
                </div>
                <h3
                  className="text-2xl font-black mb-4 text-[#0d1f35]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[#5a6a7e] leading-relaxed">{pillar.text}</p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#c9a84c]/8 to-transparent rounded-tl-[28px] rounded-br-[28px] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="bg-[#0d1f35] py-20 relative overflow-hidden noise">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(11,107,98,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={statsRef}
            className="reveal grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/6 border border-white/10 mb-6 text-[#c9a84c] text-xl group-hover:scale-110 group-hover:border-[#c9a84c]/30 transition-all duration-400">
                  {s.icon}
                </div>
                <p
                  className="text-5xl font-black text-white mb-2 stat-number"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.number}
                </p>
                <p className="text-white/50 text-sm font-medium tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ DESTINATIONS ══════════════════ */}
      <section className="py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={destRef} className="reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-xs font-bold mb-3">
                  Signature Destinations
                </p>
                <h2
                  className="text-5xl md:text-6xl font-black leading-tight text-[#0d1f35]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Where will your
                  <br />
                  next story begin?
                </h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#c9a84c] font-bold text-sm tracking-widest hover:gap-4 transition-all"
              >
                All packages <FiArrowRight />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {destinations.map((dest, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedDest(i)}
                  className={`
                    group relative rounded-[28px] overflow-hidden cursor-pointer
                    transition-all duration-500 card-premium
                    ${
                      selectedDest === i
                        ? "ring-2 ring-[#c9a84c] shadow-2xl shadow-[#c9a84c]/15 scale-[1.01]"
                        : "hover:shadow-xl"
                    }
                  `}
                >
                  <div className="relative h-[420px] img-zoom">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/90 via-[#0d1f35]/30 to-transparent" />
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="glass text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {dest.duration}
                    </span>
                  </div>
                  {selectedDest === i && (
                    <div className="absolute top-5 right-5 w-3 h-3 bg-[#c9a84c] rounded-full pulse-ring" />
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <p className="text-[#c9a84c] text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                      {dest.bestFor}
                    </p>
                    <h3
                      className="text-3xl font-black mb-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      {dest.name}
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed mb-4">
                      {dest.tag}
                    </p>

                    {/* Reveal on hover/select */}
                    <div
                      className={`
                      overflow-hidden transition-all duration-500
                      ${selectedDest === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100"}
                    `}
                    >
                      <div className="flex items-center gap-2 text-[#c9a84c] text-xs font-medium pt-2 border-t border-white/15">
                        <FiMapPin size={12} />
                        {dest.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TRIP PLANNER ══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={plannerRef}
            className="reveal grid lg:grid-cols-2 gap-14 lg:gap-20 items-center"
          >
            {/* Left: destination preview */}
            <div className="relative">
              <div className="relative rounded-[32px] overflow-hidden img-zoom shadow-2xl">
                <img
                  src={destinations[selectedDest].image}
                  alt={destinations[selectedDest].name}
                  className="w-full h-[500px] object-cover"
                  key={selectedDest}
                  style={{ animation: "fadeIn 0.5s ease both" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[#c9a84c] text-xs font-bold tracking-widest uppercase mb-1">
                    Selected Destination
                  </p>
                  <h3
                    className="text-4xl font-black"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {destinations[selectedDest].name}
                  </h3>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 glass-sand rounded-2xl px-6 py-4 shadow-xl border border-[#c9a84c]/20 animate-float">
                <p className="text-xs text-slate-900 uppercase tracking-widest font-bold">
                  Best For
                </p>
                <p className="font-black text-white mt-0.5">
                  {destinations[selectedDest].bestFor}
                </p>
              </div>
            </div>

            {/* Right: planner controls */}
            <div>
              <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-xs font-bold mb-4">
                Trip Planner
              </p>
              <h2
                className="text-4xl md:text-5xl font-black leading-tight text-[#0d1f35] mb-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Build your perfect
                <br />
                <em className="text-[#c9a84c] not-italic">
                  itinerary in seconds.
                </em>
              </h2>

              {/* Destination selector */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7e] mb-3">
                  Choose Destination
                </p>
                <div className="grid grid-cols-3 gap-2 planner-shell bg-[#f5f0e8] p-2 rounded-2xl">
                  {destinations.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDest(i)}
                      className={`
                        planner-choice py-3 px-2 rounded-xl text-sm font-bold transition-all duration-300
                        ${
                          selectedDest === i
                            ? "bg-[#0d1f35] text-white shadow-lg scale-[1.02]"
                            : "text-[#5a6a7e] hover:text-[#0d1f35] hover:bg-white"
                        }
                      `}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style selector */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#5a6a7e] mb-3">
                  Travel Style
                </p>
                <div className="space-y-2">
                  {tripStyles.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStyle(i)}
                      className={`
                        w-full flex items-center justify-between px-5 py-4 rounded-2xl border
                        transition-all duration-300 text-left
                        ${
                          selectedStyle === i
                            ? "border-[#c9a84c] bg-[#c9a84c]/6 shadow-md"
                            : "border-[#e7dfd0] hover:border-[#c9a84c]/40 hover: transition-all duration-400 card-premium"
                        }
                      `}
                    >
                      <div>
                        <span
                          className={`font-black text-sm ${selectedStyle === i ? "text-[#0d1f35]" : "text-[#5a6a7e]"}`}
                        >
                          {s.name}
                        </span>
                        <p className="text-xs text-[#5a6a7e] mt-0.5">
                          {s.pace}
                        </p>
                      </div>
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedStyle === i ? "border-[#c9a84c] bg-[#c9a84c]" : "border-[#e7dfd0]"}
                      `}
                      >
                        {selectedStyle === i && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    label: "Travelers",
                    value: travelers,
                    setter: setTravelers,
                    min: 1,
                    max: 20,
                    icon: <FiUsers size={14} />,
                  },
                  {
                    label: "Days",
                    value: days,
                    setter: setDays,
                    min: 1,
                    max: 30,
                    icon: <FiCalendar size={14} />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#f5f0e8] rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-2 text-[#5a6a7e] text-xs font-bold uppercase tracking-widest mb-4">
                      {item.icon} {item.label}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          item.setter(Math.max(item.min, item.value - 1))
                        }
                        className="w-9 h-9 rounded-xl border border-[#e7dfd0] bg-white flex items-center justify-center text-xl hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all active:scale-95"
                      >
                        −
                      </button>
                      <span
                        className="text-3xl font-black text-[#0d1f35]"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        {item.value}
                      </span>
                      <button
                        onClick={() =>
                          item.setter(Math.min(item.max, item.value + 1))
                        }
                        className="w-9 h-9 rounded-xl border border-[#e7dfd0] bg-white flex items-center justify-center text-xl hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimate card */}
              <div className="relative bg-[#0d1f35] rounded-[24px] p-7 mb-5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.15)_0%,transparent_60%)]" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest">
                      Estimated from
                    </p>
                    <p
                      className="text-5xl font-black text-white mt-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}
                    >
                      ${estimate.toLocaleString()}
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      {travelers} traveler{travelers > 1 ? "s" : ""} · {days}{" "}
                      day{days > 1 ? "s" : ""} · {activeStyle.name}
                    </p>
                  </div>
                  <div
                    className="text-[#c9a84c] text-5xl opacity-20 font-black"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    ✦
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="group block w-full py-5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-center text-[#0d1f35] font-black uppercase tracking-widest rounded-2xl hover:shadow-xl hover:shadow-[#c9a84c]/25 hover:scale-[1.02] transition-all duration-300 btn-glow"
              >
                Request This Itinerary
                <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURED PACKAGES ══════════════════ */}
      <section className="bg-[#0d1f35] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(11,107,98,0.15)_0%,transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
            <div>
              <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-xs font-bold mb-3">
                Featured This Season
              </p>
              <h2
                className="text-5xl font-black text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Handpicked Journeys
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#c9a84c] font-bold text-sm tracking-widest hover:gap-4 hover:text-white transition-all"
            >
              Browse All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#c9a84c]" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-7">
              {services.slice(0, 2).map((s) => (
                <ServiceCard key={s.id} service={s} dark />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={processRef}
            className="reveal grid lg:grid-cols-2 gap-14 items-center"
          >
            <div>
              <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-xs font-bold mb-4">
                The Process
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#0d1f35]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                From idea to unforgettable journey.
              </h2>
              <p className="mt-6 text-[#5a6a7e] leading-relaxed max-w-md">
                Our team handles every detail so you can focus on the
                experience, not the logistics.
              </p>
            </div>
            <div className="space-y-5">
              {process.map((step, i) => (
                <div
                  key={i}
                  className="group flex gap-6 p-7 rounded-[24px] border border-[#e7dfd0] hover:border-[#c9a84c]/30 hover: transition-all duration-400 card-premium"
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-2xl text-white flex items-center justify-center font-black text-lg group-hover:bg-[#c9a84c] group-hover:text-[#0d1f35] transition-all duration-400"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[#5a6a7e] leading-relaxed pt-2.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section className="relative py-28 overflow-hidden bg-[#0b6b62] text-white noise">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=85"
          alt="Planning"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b6b62]/90 via-[#0b6b62]/80 to-[#0d1f35]/80" />

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 border border-white/20 text-4xl mb-8 animate-float">
            ✦
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready for a better-planned trip?
          </h2>
          <p className="text-lg text-white/75 max-w-xl mx-auto mb-12">
            Tell us your dream destination. Our team will craft something
            extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-10 py-5 bg-white text-[#0b6b62] font-black uppercase tracking-widest rounded-full hover:bg-[#c9a84c] hover:text-[#0d1f35] hover:shadow-xl transition-all duration-300 btn-glow"
            >
              Start Planning Now
            </Link>
            <Link
              to="/register"
              className="px-10 py-5 border-2 border-white/40 hover:border-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all duration-300 text-center"
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
