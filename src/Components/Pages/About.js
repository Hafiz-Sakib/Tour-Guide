// src/Components/About/About.js
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const values = [
  "Human travel planning with clear communication",
  "Vetted guides, stays, drivers, and experience partners",
  "Local culture, environmental care, and fair community relationships",
  "Flexible itineraries designed around real traveler needs",
];

const metrics = [
  {
    icon: <FiUsers />,
    value: "12k+",
    label: "Curated journeys",
    detail:
      "Private holidays, family escapes, group tours, and corporate retreats planned with hands-on support.",
  },
  {
    icon: <FiMapPin />,
    value: "34",
    label: "Partner destinations",
    detail:
      "Trusted local operators across beaches, hills, rivers, heritage towns, and cultural routes.",
  },
  {
    icon: <FiStar />,
    value: "4.9/5",
    label: "Average rating",
    detail:
      "Consistent traveler feedback for communication, reliability, guide quality, and itinerary pacing.",
  },
  {
    icon: <FiClock />,
    value: "24/7",
    label: "Traveler support",
    detail:
      "On-trip assistance for schedule changes, transfer questions, local coordination, and emergencies.",
  },
];

const About = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const selectedMetric = metrics[activeMetric];

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-[#132236] text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=85"
          alt="Travel planning"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236]/95 via-[#132236]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#f4c76b] uppercase tracking-[0.25em] text-sm font-bold">
            About Sababa Tours
          </p>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
            A travel agency built for calm,
            <br />
            confident journeys.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/80">
            We plan refined, reliable trips with careful pacing, trusted local
            partners, and hands-on support from first idea to final return.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=85"
              alt="Travel consultation"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 bg-white p-6 shadow-2xl rounded-2xl">
              <p className="text-5xl font-black text-[#0f766e]">4.9</p>
              <p className="text-sm font-black uppercase tracking-widest text-[#65758a]">
                Guest Rating
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              Our Philosophy
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
              Premium travel is not louder.
              <br />
              It is smoother.
            </h2>
            <p className="mt-8 text-lg text-[#65758a] leading-relaxed">
              Sababa Tours blends deep destination expertise with
              concierge-style planning. We help travelers discover Bangladesh’s
              beaches, hills, rivers, and culture through practical, respectful
              itineraries.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-[#132236] py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#f4c76b] uppercase tracking-widest text-sm font-bold">
                Agency Metrics
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-black">
                Numbers that reflect real travel care.
              </h2>
              <p className="mt-6 text-white/70">Tap a metric to learn more.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {metrics.map((metric, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMetric(index)}
                  className={`p-8 rounded-3xl border transition-all text-left ${
                    activeMetric === index
                      ? "border-[#f4c76b] bg-white text-[#132236]"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div
                    className={`text-4xl mb-6 ${activeMetric === index ? "text-[#f25f4c]" : "text-[#f4c76b]"}`}
                  >
                    {metric.icon}
                  </div>
                  <p className="text-5xl font-black">{metric.value}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest">
                    {metric.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Metric Detail */}
          <div className="mt-12 bg-white/10 backdrop-blur border border-white/20 p-10 rounded-3xl text-white">
            <div className="flex items-center gap-6">
              <div className="text-6xl text-[#f4c76b]">
                {selectedMetric.icon}
              </div>
              <div>
                <p className="uppercase tracking-widest text-[#f4c76b] text-sm">
                  {selectedMetric.label}
                </p>
                <p className="text-6xl font-black">{selectedMetric.value}</p>
              </div>
            </div>
            <p className="mt-6 text-lg text-white/80">
              {selectedMetric.detail}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              Why Travelers Choose Us
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black">
              Details handled by people who know the ground.
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 bg-[#132236] text-white px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#f25f4c] transition"
            >
              Speak With Us <FiArrowRight />
            </Link>
          </div>

          <div className="space-y-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="flex gap-5 bg-[#fbf8f2] border border-[#e7dfd0] p-7 rounded-3xl"
              >
                <FiCheckCircle className="text-2xl text-[#0f766e] mt-1 shrink-0" />
                <p className="text-[#65758a] leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#132236] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <FiGlobe className="text-4xl text-[#f4c76b] mb-4" />
            <h2 className="text-4xl font-black">Planning a special trip?</h2>
            <p className="text-white/70 mt-3">
              Honeymoons, family holidays, private adventures, or corporate
              retreats — we craft them all.
            </p>
          </div>
          <Link
            to="/services"
            className="px-10 py-5 bg-[#f25f4c] text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-[#132236] transition"
          >
            Browse Packages
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
