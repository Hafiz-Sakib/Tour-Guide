import React from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

const NewsLetter = () => (
  <section className="py-20 bg-[#0a1628]" style={{fontFamily: "'DM Sans', system-ui, sans-serif"}}>
    <div className="max-w-2xl mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px w-8 bg-[#c9a84c]"></div>
        <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase">Newsletter</span>
        <div className="h-px w-8 bg-[#c9a84c]"></div>
      </div>

      <h2 className="text-4xl font-black text-white mb-4" style={{fontFamily: "'Playfair Display', Georgia, serif"}}>
        Weekly trail<br /><em className="font-light text-[#c9a84c]">updates.</em>
      </h2>
      <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
        Subscribe to my blog for weekly articles on trails, gear, and responsible adventure in Bangladesh.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-white/5 border border-white/10 rounded-full hover:border-[#c9a84c]/40 transition-colors focus-within:border-[#c9a84c]/60">
          <FiMail className="text-[#c9a84c] shrink-0 w-4 h-4" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-transparent flex-1 outline-none text-sm py-0.5 text-white placeholder-white/30"
          />
        </div>
        <button className="px-7 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#0a1628] text-xs font-black tracking-wider uppercase rounded-full hover:shadow-lg hover:shadow-[#c9a84c]/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap">
          Subscribe <FiArrowRight />
        </button>
      </div>

      <p className="text-white/20 text-xs mt-5">No spam, ever. Unsubscribe anytime.</p>
    </div>
  </section>
);

export default NewsLetter;
