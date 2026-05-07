// src/Components/NewsLetter.js
import React from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

const NewsLetter = () => (
  <section className="py-20 md:py-28 bg-[#132236]">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-10 bg-[#c9a84c]"></div>
        <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase">
          Stay Inspired
        </span>
        <div className="h-px w-10 bg-[#c9a84c]"></div>
      </div>

      <h2
        className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Weekly stories from
        <br />
        <em className="text-[#c9a84c] font-light">the trails of Bangladesh</em>
      </h2>

      <p className="text-white/60 text-[17px] max-w-md mx-auto mb-10">
        Curated travel insights, hidden gems, responsible tourism tips, and
        seasonal recommendations.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-white/10 border border-white/20 rounded-full focus-within:border-[#c9a84c] transition-all">
          <FiMail className="text-[#c9a84c] w-5 h-5" />
          <input
            type="email"
            placeholder="Your email address"
            className="bg-transparent flex-1 outline-none text-white placeholder:text-white/40 text-base"
          />
        </div>

        <button className="px-10 py-4 bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#132236] font-black uppercase tracking-widest text-sm rounded-full hover:shadow-xl hover:shadow-[#c9a84c]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
          Subscribe
          <FiArrowRight />
        </button>
      </div>

      <p className="text-white/30 text-xs mt-6">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  </section>
);

export default NewsLetter;
