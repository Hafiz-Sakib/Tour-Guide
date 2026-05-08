// src/Components/Services/Services.js
import { useEffect, useMemo, useRef, useState } from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import ServiceCard from "./ServiceCard";

const API = "https://sababa-tours-backend.onrender.com/api/services";

const sortOptions = [
  { value: "default", label: "Recommended" },
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(API);

        if (!res.ok) throw new Error("Network error");

        const result = await res.json();

        const servicesData = Array.isArray(result) ? result : result.data;

        setServices(
          servicesData.map((s) => ({
            ...s,
            id: s._id,
            price: parseFloat(String(s.balance).replace(/[^0-9.]/g, "")) || 0,
          })),
        );
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loading]);

  const filtered = useMemo(() => {
    return services
      .filter((s) =>
        `${s.name || ""} ${s.about || ""}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .sort((a, b) => {
        const pA = parseFloat(String(a.balance).replace(/[^0-9.]/g, "")) || 0;
        const pB = parseFloat(String(b.balance).replace(/[^0-9.]/g, "")) || 0;
        if (sortBy === "price-asc") return pA - pB;
        if (sortBy === "price-desc") return pB - pA;
        if (sortBy === "name")
          return (a.name || "").localeCompare(b.name || "");
        return 0;
      });
  }, [query, services, sortBy]);

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-[76px] text-[#0d1f35]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0d1f35] py-24 md:py-32 text-white noise">
        <div className="absolute inset-0 img-zoom">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85"
            alt="Travel packages"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f35]/97 via-[#0d1f35]/82 to-[#0d1f35]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(11,107,98,0.15)_0%,transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#c9a84c] uppercase tracking-[0.28em] text-[10px] font-bold mb-5 animate-fade-in">
            Travel Packages
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 animate-fade-up"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Curated trips for every
            <br />
            kind of traveler.
          </h1>
          <p className="animate-fade-up delay-200 max-w-xl text-white/70 text-lg leading-relaxed">
            Handcrafted journeys across Bangladesh — from misty hill tracks to
            golden beaches.
          </p>
        </div>
      </section>

      {/* ── Sticky Search Bar ── */}
      <section className="sticky top-[76px] z-40 bg-white/96 backdrop-blur-2xl border-b border-[#e7dfd0] py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5a6a7e] text-sm" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, hills, beaches, culture..."
                className="w-full border border-[#e7dfd0] bg-[#faf7f2] pl-12 pr-11 py-4 rounded-2xl focus:border-[#0b6b62]/50 focus:bg-white outline-none text-sm placeholder:text-[#5a6a7e]/50 transition-all duration-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a6a7e] hover:text-[#0d1f35] transition-colors"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5a6a7e] whitespace-nowrap">
                <FiFilter size={13} /> Sort by
              </span>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl border transition-all duration-300 active:scale-95 ${
                    sortBy === opt.value
                      ? "bg-[#0d1f35] text-white border-[#0d1f35] shadow-md"
                      : "border-[#e7dfd0] text-[#5a6a7e] hover:border-[#0b6b62]/40 hover:text-[#0b6b62]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs font-bold text-[#5a6a7e]">
            <span className="text-[#0b6b62]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "package" : "packages"} available
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-14 lg:px-10 pb-28">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-36 gap-4">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#e7dfd0] border-t-[#0b6b62]" />
            <p className="text-[#5a6a7e] text-sm">Loading packages…</p>
          </div>
        ) : filtered.length > 0 ? (
          <div
            ref={gridRef}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((s, i) => (
              <div key={s.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ServiceCard service={s} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-36 bg-white border border-[#e7dfd0] rounded-[32px] shadow-sm">
            <div className="text-5xl mb-6">🗺️</div>
            <p
              className="text-3xl font-black text-[#0d1f35] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No matching packages found
            </p>
            <p className="text-[#5a6a7e] mb-8">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => setQuery("")}
              className="px-8 py-4 bg-[#0d1f35] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#0b6b62] transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Services;
