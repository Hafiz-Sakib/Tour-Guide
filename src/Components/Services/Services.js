import { useEffect, useMemo, useState } from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import ServiceCard from "./ServiceCard";

const sortOptions = [
  { value: "default", label: "Recommended" },
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Lowest price" },
  { value: "price-desc", label: "Highest price" },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json")
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
        const text = `${service.name || ""} ${service.about || ""}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
      .sort((a, b) => {
        const priceA = parseFloat(String(a.balance).replace(/[^0-9.]/g, "")) || 0;
        const priceB = parseFloat(String(b.balance).replace(/[^0-9.]/g, "")) || 0;
        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
        return 0;
      });
  }, [query, services, sortBy]);

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      <section className="relative overflow-hidden bg-[#132236] py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85"
          alt="Travel packages"
          className="absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236] via-[#132236]/84 to-[#132236]/48" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">Travel Packages</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Curated trips for every kind of traveler.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
            Compare our ready-to-book journeys, then customize dates, group size, and trip style with the Sababa concierge team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-4 border border-[#e7dfd0] bg-white p-5 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search destinations, beaches, hills, culture..."
              className="w-full border border-[#e7dfd0] bg-[#fbf8f2] py-4 pl-11 pr-11 text-sm text-[#132236] placeholder:text-[#65758a]/60 focus:border-[#0f766e] focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#65758a]" aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#65758a]">
              <FiFilter /> Sort
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`border px-4 py-3 text-xs font-black uppercase tracking-[0.13em] transition ${
                  sortBy === option.value
                    ? "border-[#132236] bg-[#132236] text-white"
                    : "border-[#e7dfd0] bg-white text-[#65758a] hover:border-[#0f766e] hover:text-[#0f766e]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#65758a]">
          {filtered.length} {filtered.length === 1 ? "package" : "packages"} available
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-12 w-12 animate-spin border-2 border-[#e7dfd0] border-t-[#0f766e]" />
          </div>
        ) : filtered.length ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="border border-[#e7dfd0] bg-white px-6 py-20 text-center">
            <p className="text-2xl font-black text-[#132236]">No matching packages found.</p>
            <p className="mt-3 text-sm text-[#65758a]">Try a destination, region, or travel style.</p>
            <button onClick={() => setQuery("")} className="mt-8 bg-[#132236] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
              Clear Search
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Services;
