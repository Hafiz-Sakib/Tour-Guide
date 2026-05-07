// src/Components/ExtraSection.js
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ExtraSection = ({ content, alternative }) => (
  <section className="bg-white py-16 md:py-24">
    <div
      className={`max-w-7xl mx-auto px-6 lg:px-10 flex flex-col ${alternative ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-16 items-center`}
    >
      {/* Image Side */}
      <div className="flex-1 overflow-hidden rounded-3xl shadow-xl">
        <img
          src={content.img}
          alt={content.title}
          className="w-full h-[420px] md:h-[520px] lg:h-[580px] object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Side */}
      <div className="flex-1">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#c9a84c]"></div>
            <span className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase">
              Featured Experience
            </span>
            <div className="h-px w-10 bg-[#c9a84c]"></div>
          </div>

          <h2
            className="text-4xl md:text-5xl font-black leading-tight text-[#132236] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {content.title}
          </h2>

          <p className="text-[#65758a] text-[17px] leading-relaxed mb-10">
            {content.des}
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#132236] text-white text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#f25f4c] hover:text-white transition-all duration-300 group"
          >
            Explore This Journey
            <FiArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ExtraSection;
