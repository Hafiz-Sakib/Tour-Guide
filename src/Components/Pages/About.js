import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiCheckCircle, FiGlobe, FiMapPin, FiUsers } from "react-icons/fi";

const values = [
  "Human travel planning with clear communication",
  "Vetted guides, stays, drivers, and experience partners",
  "Local culture, environmental care, and fair community relationships",
  "Flexible itineraries designed around real traveler needs",
];

const metrics = [
  { icon: <FiUsers />, value: "12k+", label: "Travelers planned" },
  { icon: <FiMapPin />, value: "34", label: "Destinations" },
  { icon: <FiAward />, value: "15+", label: "Years expertise" },
];

const About = () => (
  <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
    <section className="relative overflow-hidden bg-[#132236] py-24 text-white">
      <img
        src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1600&q=85"
        alt="Travel agency planning"
        className="absolute inset-0 h-full w-full object-cover opacity-26"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#132236] via-[#132236]/82 to-[#132236]/40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">About Sababa Tours</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
          A travel agency built for calm, confident journeys.
        </h1>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=85"
          alt="Travel consultation"
          className="h-full min-h-[480px] w-full object-cover"
        />
        <div className="absolute bottom-6 left-6 bg-white p-6 shadow-xl">
          <p className="text-4xl font-black text-[#0f766e]">4.9</p>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#65758a]">Guest rating</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Our Philosophy</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          Premium travel is not louder. It is smoother.
        </h2>
        <p className="mt-6 text-sm leading-7 text-[#65758a]">
          Sababa Tours blends destination expertise with concierge-style planning. We help travelers discover Bangladesh's beaches, hills, rivers, food, and culture through practical itineraries that respect time, comfort, safety, and budget.
        </p>
        <p className="mt-4 text-sm leading-7 text-[#65758a]">
          Our work begins before the trip and continues until you return home. From private guides to family holidays and corporate retreats, the goal is simple: make travel feel generous, organized, and memorable.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="border border-[#e7dfd0] bg-white p-5">
              <div className="mb-3 text-2xl text-[#f25f4c]">{metric.icon}</div>
              <p className="text-2xl font-black">{metric.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#65758a]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Why Travelers Choose Us</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Details handled by people who know the ground.</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-[#132236] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
            Speak With Us <FiArrowRight />
          </Link>
        </div>
        <div className="grid gap-4">
          {values.map((value) => (
            <div key={value} className="flex gap-4 border border-[#e7dfd0] bg-[#fbf8f2] p-5">
              <FiCheckCircle className="mt-1 shrink-0 text-xl text-[#0f766e]" />
              <p className="text-sm leading-7 text-[#65758a]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#132236] py-20 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center lg:px-10">
        <div>
          <FiGlobe className="mb-4 text-3xl text-[#f4c76b]" />
          <h2 className="text-4xl font-black tracking-tight">Planning a special trip?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62">
            Our team can shape honeymoons, family holidays, private adventures, and corporate retreats.
          </p>
        </div>
        <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-[#f25f4c] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
          Browse Packages <FiArrowRight />
        </Link>
      </div>
    </section>
  </main>
);

export default About;
