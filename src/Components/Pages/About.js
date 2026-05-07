// src/Components/Pages/About.js
import { useEffect, useRef, useState } from "react";
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
  "Human travel planning with clear, honest communication",
  "Vetted guides, stays, drivers, and experience partners",
  "Local culture, environmental care, and fair community relationships",
  "Flexible itineraries designed around real traveler needs",
];

const metrics = [
  {
    icon: <FiUsers />,
    value: "12k+",
    label: "Curated Journeys",
    detail:
      "Private holidays, family escapes, group tours, and corporate retreats planned with hands-on support.",
  },
  {
    icon: <FiMapPin />,
    value: "34",
    label: "Partner Destinations",
    detail:
      "Trusted local operators across beaches, hills, rivers, heritage towns, and cultural routes.",
  },
  {
    icon: <FiStar />,
    value: "4.9",
    label: "Average Rating",
    detail:
      "Consistent traveler feedback for communication, reliability, guide quality, and itinerary pacing.",
  },
  {
    icon: <FiClock />,
    value: "24/7",
    label: "Traveler Support",
    detail:
      "On-trip assistance for schedule changes, transfer questions, local coordination, and emergencies.",
  },
];

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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const About = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const philosophyRef = useReveal();
  const metricsRef = useReveal();
  const valuesRef = useReveal();
  const selected = metrics[activeMetric];

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] text-[#0d1f35]">
      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-center bg-[#0d1f35] text-white overflow-hidden noise">
        <div className="absolute inset-0 img-zoom">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=85"
            alt="Travel planning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f35]/97 via-[#0d1f35]/80 to-[#0d1f35]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(11,107,98,0.15)_0%,transparent_55%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <p className="text-[#c9a84c] uppercase tracking-[0.28em] text-[10px] font-bold mb-6 animate-fade-in">
            About Sababa Tours
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-8 animate-fade-up"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            A travel agency built for calm,
            <br />
            <em className="text-shimmer not-italic">confident journeys.</em>
          </h1>
          <p className="animate-fade-up delay-200 max-w-2xl text-lg text-white/70 leading-relaxed">
            We plan refined, reliable trips with careful pacing, trusted local
            partners, and hands-on support from first idea to final return.
          </p>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-20 md:py-28 bg-white">
        <div
          ref={philosophyRef}
          className="reveal max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center"
        >
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl img-zoom">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=85"
              alt="Travel consultation"
              className="w-full h-[480px] object-cover"
            />
            {/* Floating rating card */}
            <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-7 py-5 shadow-2xl border border-[#e7dfd0]">
              <p
                className="text-5xl font-black text-[#0b6b62]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                4.9
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] mt-1">
                Guest Rating
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-[10px] font-bold mb-5">
              Our Philosophy
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight text-[#0d1f35] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Premium travel is not louder.
              <br />
              <em className="text-[#c9a84c] not-italic">It is smoother.</em>
            </h2>
            <p className="text-lg text-[#5a6a7e] leading-relaxed">
              Sababa Tours blends deep destination expertise with
              concierge-style planning. We help travelers discover Bangladesh's
              beaches, hills, rivers, and culture through practical, respectful
              itineraries.
            </p>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="bg-[#0d1f35] py-20 md:py-28 text-white relative overflow-hidden noise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(11,107,98,0.15)_0%,transparent_55%)]" />
        <div
          ref={metricsRef}
          className="reveal relative max-w-7xl mx-auto px-6 lg:px-10"
        >
          <div className="grid lg:grid-cols-2 gap-14 mb-12">
            <div>
              <p className="text-[#c9a84c] uppercase tracking-[0.25em] text-[10px] font-bold mb-5">
                Agency Metrics
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Numbers that reflect real travel care.
              </h2>
              <p className="mt-5 text-white/50 text-sm">
                Select a metric to learn more.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMetric(i)}
                  className={`
                    p-7 rounded-[24px] border text-left transition-all duration-400 about-stat-card
                    ${
                      activeMetric === i
                        ? "border-[#c9a84c] bg-white text-[#0d1f35] shadow-2xl scale-[1.03]"
                        : "border-white/10 bg-white/4 hover:border-white/25 hover:bg-white/7"
                    }
                  `}
                >
                  <div
                    className={`text-3xl mb-5 ${activeMetric === i ? "text-[#e85d45]" : "text-[#c9a84c]"}`}
                  >
                    {m.icon}
                  </div>
                  <p
                    className={`text-4xl font-black ${activeMetric === i ? "text-[#0d1f35]" : "text-white"}`}
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    className={`mt-1.5 text-[10px] font-black uppercase tracking-widest ${activeMetric === i ? "text-[#5a6a7e]" : "text-white/50"}`}
                  >
                    {m.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div
            className="glass border-white/12 p-10 rounded-[28px] text-white transition-all duration-500"
            key={activeMetric}
            style={{ animation: "fadeIn 0.4s ease both" }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="text-5xl text-[#c9a84c]">{selected.icon}</div>
              <div>
                <p className="text-[#c9a84c] text-[10px] uppercase tracking-widest font-bold">
                  {selected.label}
                </p>
                <p
                  className="text-5xl font-black mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {selected.value}
                </p>
              </div>
            </div>
            <p className="text-white/65 leading-relaxed">{selected.detail}</p>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-28 bg-white">
        <div
          ref={valuesRef}
          className="reveal max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14"
        >
          <div>
            <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-[10px] font-bold mb-5">
              Why Travelers Choose Us
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight text-[#0d1f35]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Details handled by people who know the ground.
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 bg-[#0d1f35] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#c9a84c] hover:text-[#0d1f35] transition-all duration-300 group btn-glow"
            >
              Speak With Us
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="group flex gap-5 bg-[#f5f0e8] border border-[#e7dfd0] p-6 rounded-[20px] hover:border-[#c9a84c]/30 hover:bg-[#ede8df] transition-all duration-300 card-premium"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <FiCheckCircle className="text-xl text-[#0b6b62] mt-0.5 shrink-0 group-hover:text-[#c9a84c] transition-colors duration-300" />
                <p className="text-[#5a6a7e] leading-relaxed text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d1f35] py-20 text-white relative overflow-hidden noise">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(201,168,76,0.07)_0%,transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/12 border border-[#c9a84c]/20 flex items-center justify-center text-2xl text-[#c9a84c] mb-6">
              <FiGlobe />
            </div>
            <h2
              className="text-4xl font-black"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Planning a special trip?
            </h2>
            <p className="text-white/55 mt-3 max-w-md">
              Honeymoons, family holidays, private adventures, or corporate
              retreats — we craft them all.
            </p>
          </div>
          <Link
            to="/services"
            className="shrink-0 px-10 py-5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] font-black uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-[#c9a84c]/25 hover:scale-105 transition-all duration-300 btn-glow whitespace-nowrap"
          >
            Browse Packages
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
