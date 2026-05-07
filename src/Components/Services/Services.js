// src/Components/Services/Services.js
import { useEffect, useMemo, useState } from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import ServiceCard from "./ServiceCard";

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

  const filtered = useMemo(() => {
    return services
      .filter((service) => {
        const text =
          `${service.name || ""} ${service.about || ""}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
      .sort((a, b) => {
        const priceA =
          parseFloat(String(a.balance).replace(/[^0-9.]/g, "")) || 0;
        const priceB =
          parseFloat(String(b.balance).replace(/[^0-9.]/g, "")) || 0;
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "name")
          return (a.name || "").localeCompare(b.name || "");
        return 0;
      });
  }, [query, services, sortBy]);

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#132236] py-20 md:py-28 text-white">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85"
          alt="Travel packages"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236]/95 via-[#132236]/80 to-[#132236]/70" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center md:text-left">
          <p className="text-[#f4c76b] uppercase tracking-[0.25em] text-sm font-bold">
            Travel Packages
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            Curated trips for every kind of traveler.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-white/80 text-lg">
            Discover handcrafted journeys across Bangladesh — from hill tracks
            to golden beaches.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-[76px] z-40 bg-white border-b border-[#e7dfd0] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#65758a]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, hills, beaches, culture..."
                className="w-full border border-[#e7dfd0] bg-[#fbf8f2] pl-14 pr-12 py-4 rounded-2xl focus:border-[#0f766e] outline-none text-base placeholder:text-[#65758a]/60"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#65758a] hover:text-[#132236]"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#65758a] whitespace-nowrap">
                <FiFilter /> Sort by
              </span>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-6 py-3 text-sm font-bold uppercase tracking-widest rounded-2xl border transition-all ${
                    sortBy === option.value
                      ? "bg-[#132236] text-white border-[#132236]"
                      : "border-[#e7dfd0] hover:border-[#0f766e] hover:text-[#0f766e]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-5 text-sm font-bold text-[#65758a]">
            {filtered.length} {filtered.length === 1 ? "package" : "packages"}{" "}
            available
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:px-10 pb-24">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="h-14 w-14 animate-spin border-4 border-[#e7dfd0] border-t-[#0f766e] rounded-full" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border border-[#e7dfd0] rounded-3xl">
            <p className="text-3xl font-black text-[#132236]">
              No matching packages found
            </p>
            <p className="mt-4 text-[#65758a]">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-8 px-8 py-4 bg-[#132236] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#0f766e]"
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
