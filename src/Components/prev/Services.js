import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((r) => r.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = services
    .filter(
      (s) =>
        s.name?.toLowerCase().includes(query.toLowerCase()) ||
        s.about?.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return parseFloat(a.balance) - parseFloat(b.balance);
      }

      if (sortBy === "price-desc") {
        return parseFloat(b.balance) - parseFloat(a.balance);
      }

      if (sortBy === "name") {
        return a.name?.localeCompare(b.name);
      }

      return 0;
    });

  return (
    <main className="pt-[72px] min-h-screen bg-cream">
      {/* HEADER */}
      <div className="bg-forest py-20 px-6 text-center">
        <div className="section-eyebrow justify-center mb-4">
          <span className="eyebrow-text text-gold/80">Tour Packages</span>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream mb-4">
          All Experiences
        </h1>

        <p className="text-cream/60 max-w-lg mx-auto text-sm leading-relaxed">
          Choose from a curated selection of guided treks, cultural immersions,
          and wilderness adventures across Bangladesh's hill tracts.
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* SEARCH */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke w-4 h-4" />

            <input
              type="text"
              placeholder="Search destinations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          {/* SORT */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-smoke uppercase tracking-wider">
              Sort by:
            </span>

            {["default", "name", "price-asc", "price-desc"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-sm border transition-all ${
                  sortBy === opt
                    ? "bg-forest text-cream border-forest"
                    : "border-sand text-smoke hover:border-forest hover:text-forest"
                }`}
              >
                {opt === "default"
                  ? "Default"
                  : opt === "name"
                    ? "Name"
                    : opt === "price-asc"
                      ? "Price ↑"
                      : "Price ↓"}
              </button>
            ))}
          </div>
        </div>

        <p className="text-smoke text-xs mt-3">
          {filtered.length} {filtered.length === 1 ? "package" : "packages"}{" "}
          found
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-jade border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-smoke text-lg">No packages match your search.</p>

            <button onClick={() => setQuery("")} className="btn-ghost mt-4">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Services;
