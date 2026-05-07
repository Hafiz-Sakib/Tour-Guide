// src/Components/Blogs/Blogs.js
import { useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiTag,
  FiSearch,
} from "react-icons/fi";

const articles = [
  {
    title: "Best time to visit Bangladesh's hill destinations",
    category: "Travel Tips",
    date: "Oct 2026",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    excerpt:
      "A practical seasonal guide for dry trails, clear views, waterfalls, and comfortable road transfers.",
  },
  {
    title: "How to plan a premium family beach escape",
    category: "Planning",
    date: "Sep 2026",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    excerpt:
      "The small choices that make a Cox's Bazar trip smoother for families, from hotel location to transfer timing.",
  },
  {
    title: "Responsible travel in local communities",
    category: "Culture",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85",
    excerpt:
      "How to travel with curiosity and respect while supporting local guides, hosts, and makers.",
  },
];

const faqs = [
  {
    q: "Can Sababa Tours customize a package?",
    a: "Yes. Every listed package can be adjusted for dates, group size, hotel standard, transport style, pace, and special interests.",
  },
  {
    q: "Do I need to pay online to request a booking?",
    a: "No. The booking form creates a request first. Our team confirms availability, itinerary details, and payment steps afterward.",
  },
  {
    q: "Are guides and drivers vetted?",
    a: "Yes. We work with trusted local partners and match guides based on destination, language needs, safety requirements, and trip style.",
  },
  {
    q: "Can you arrange corporate or group travel?",
    a: "Yes. We plan retreats, educational trips, private group tours, and family events with custom logistics and support.",
  },
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e7dfd0] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left hover:text-[#0f766e] transition"
      >
        <span className="text-lg font-bold text-[#132236]">{faq.q}</span>
        <span className="text-2xl text-[#0f766e] shrink-0">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>
      {open && <p className="pb-8 text-[#65758a] leading-relaxed">{faq.a}</p>}
    </div>
  );
};

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Travel Tips", "Planning", "Culture"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#132236] py-20 md:py-28 text-white">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=85"
          alt="Travel journal"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236]/95 via-[#132236]/80 to-[#132236]/70" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <p className="text-[#f4c76b] uppercase tracking-[0.25em] text-sm font-bold">
            Travel Journal
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
            Useful insight before you pack.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Destination guides, planning advice, and stories from the field by
            the Sababa travel desk.
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:px-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              Latest Articles
            </p>
            <h2 className="mt-2 text-4xl md:text-5xl font-black">
              Planning notes from the field.
            </h2>
          </div>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#e7dfd0] bg-[#fbf8f2] pl-11 pr-4 py-4 rounded-2xl focus:border-[#0f766e] outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#132236] text-white"
                  : "bg-white border border-[#e7dfd0] hover:border-[#0f766e]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, i) => (
            <article
              key={i}
              className="group bg-white border border-[#e7dfd0] rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-7">
                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-[#65758a] mb-4">
                  <span className="flex items-center gap-1.5">
                    <FiTag className="text-[#0f766e]" /> {article.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="text-[#0f766e]" /> {article.date}
                  </span>
                </div>
                <h3 className="text-xl font-black leading-tight mb-3">
                  {article.title}
                </h3>
                <p className="text-[#65758a] line-clamp-3">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
              Common questions, clear answers.
            </h2>
            <p className="mt-6 text-[#65758a] text-lg">
              Need something specific? Reach out — we’re happy to help shape
              your journey.
            </p>
          </div>

          <div className="border border-[#e7dfd0] bg-[#fbf8f2] rounded-3xl p-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blogs;
