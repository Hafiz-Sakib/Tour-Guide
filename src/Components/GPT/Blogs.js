import { useState } from "react";
import { FiCalendar, FiChevronDown, FiChevronUp, FiTag } from "react-icons/fi";

const articles = [
  {
    title: "Best time to visit Bangladesh's hill destinations",
    category: "Travel Tips",
    date: "Oct 2026",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85",
    excerpt: "A practical seasonal guide for dry trails, clear views, waterfalls, and comfortable road transfers.",
  },
  {
    title: "How to plan a premium family beach escape",
    category: "Planning",
    date: "Sep 2026",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    excerpt: "The small choices that make a Cox's Bazar trip smoother for families, from hotel location to transfer timing.",
  },
  {
    title: "Responsible travel in local communities",
    category: "Culture",
    date: "Aug 2026",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85",
    excerpt: "How to travel with curiosity and respect while supporting local guides, hosts, and makers.",
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
      <button onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-5 py-6 text-left">
        <span className="text-base font-black text-[#132236]">{faq.q}</span>
        <span className="text-[#0f766e]">{open ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>
      {open && <p className="pb-6 text-sm leading-7 text-[#65758a]">{faq.a}</p>}
    </div>
  );
};

const Blogs = () => (
  <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
    <section className="relative overflow-hidden bg-[#132236] py-24 text-white">
      <img
        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=85"
        alt="Travel journal"
        className="absolute inset-0 h-full w-full object-cover opacity-22"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#132236] via-[#132236]/84 to-[#132236]/44" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">Travel Journal</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
          Useful insight before you pack.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
          Destination notes, planning advice, and answers to common questions from the Sababa travel desk.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Latest Articles</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight">Planning notes from the field.</h2>
      </div>
      <div className="grid gap-7 md:grid-cols-3">
        {articles.map((article) => (
          <article key={article.title} className="border border-[#e7dfd0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <img src={article.image} alt={article.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="mb-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.12em] text-[#65758a]">
                <span className="inline-flex items-center gap-1.5">
                  <FiTag className="text-[#0f766e]" /> {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="text-[#0f766e]" /> {article.date}
                </span>
              </div>
              <h3 className="text-xl font-black leading-tight">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#65758a]">{article.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1fr] lg:px-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">FAQ</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Common questions, clear answers.</h2>
          <p className="mt-5 text-sm leading-7 text-[#65758a]">
            Need something specific? Send us a message and we will help you shape the right journey.
          </p>
        </div>
        <div className="border border-[#e7dfd0] bg-[#fbf8f2] px-7">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Blogs;
