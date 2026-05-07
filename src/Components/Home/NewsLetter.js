// src/Components/NewsLetter.js
import { useEffect, useRef } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";

const NewsLetter = () => {
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

  return (
    <section className="py-24 md:py-32 bg-[#0d1f35] relative overflow-hidden noise">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(11,107,98,0.18)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.08)_0%,transparent_55%)]" />

      {/* Decorative ring */}
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/5 animate-spin-slow" />
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#c9a84c]/6 animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      />

      <div
        ref={ref}
        className="reveal relative max-w-2xl mx-auto px-6 text-center"
      >
        {/* Label */}
        <div className="divider-gold mb-6 max-w-xs mx-auto">
          <span className="text-[#c9a84c] text-[10px] font-bold tracking-[0.35em] uppercase whitespace-nowrap px-4">
            Stay Inspired
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Weekly stories from
          <br />
          <em className="text-shimmer not-italic">the trails of Bangladesh</em>
        </h2>

        <p className="text-white/55 text-[17px] max-w-md mx-auto mb-10 leading-relaxed">
          Curated travel insights, hidden gems, responsible tourism tips, and
          seasonal recommendations.
        </p>

        {/* Input row */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1 flex items-center gap-3 px-5 py-4 glass border-white/15 rounded-full focus-within:border-[#c9a84c]/50 transition-all duration-300">
            <FiMail className="text-[#c9a84c] shrink-0" />
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent flex-1 outline-none text-white placeholder:text-white/35 text-sm"
            />
          </div>
          <button
            className="
            group px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]
            text-[#0d1f35] font-black uppercase tracking-widest text-xs
            rounded-full hover:shadow-xl hover:shadow-[#c9a84c]/25
            hover:scale-105 active:scale-95
            transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap btn-glow
          "
          >
            Subscribe
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-white/25 text-xs mt-5">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
