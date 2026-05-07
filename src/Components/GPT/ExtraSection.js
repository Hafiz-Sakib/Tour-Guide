import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ExtraSection = ({ content, alternative }) => (
  <section
    className={`flex ${alternative ? "md:flex-row-reverse" : "md:flex-row"} flex-col gap-0 overflow-hidden`}
    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
  >
    <div className="flex-1 overflow-hidden">
      <img
        src={content.img}
        alt={content.title}
        className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
      />
    </div>
    <div className="flex-1 flex items-center bg-[#f8f5ef] px-12 py-16">
      <div className="max-w-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-[#c9a84c]"></div>
          <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase">
            Featured
          </span>
        </div>
        <h2
          className="text-4xl font-black text-[#0a1628] mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {content.title}
        </h2>
        <p className="text-[#0a1628]/50 text-sm leading-relaxed mb-8">
          {content.des}
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a1628] text-white text-xs font-black tracking-wider uppercase rounded-full hover:bg-[#c9a84c] hover:text-[#0a1628] transition-all duration-300"
        >
          Explore Services <FiArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default ExtraSection;
