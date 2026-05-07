// src/Components/ExtraSection.js
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const ExtraSection = ({ content, alternative }) => {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div
        ref={ref}
        className={`reveal max-w-7xl mx-auto px-6 lg:px-10 flex flex-col ${
          alternative ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-14 lg:gap-20 items-center`}
      >
        {/* Image */}
        <div className="flex-1 relative rounded-[32px] overflow-hidden shadow-2xl img-zoom group">
          <img
            src={content.img}
            alt={content.title}
            className="w-full h-[420px] md:h-[520px] lg:h-[580px] object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Corner gold accent */}
          <div
            className={`
            absolute ${alternative ? "top-6 left-6" : "top-6 right-6"}
            w-16 h-16 border-2 border-[#c9a84c]/40 rounded-[20px]
            group-hover:scale-110 group-hover:border-[#c9a84c] transition-all duration-500
          `}
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="max-w-lg">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[10px] font-bold tracking-[0.35em] uppercase">
                Featured Experience
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-black leading-tight text-[#0d1f35] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {content.title}
            </h2>

            <p className="text-[#5a6a7e] text-[17px] leading-relaxed mb-10">
              {content.des}
            </p>

            <Link
              to="/services"
              className="
                group inline-flex items-center gap-3 px-8 py-4
                bg-[#0d1f35] text-white text-sm font-black uppercase tracking-widest
                rounded-full hover:bg-[#c9a84c] hover:text-[#0d1f35]
                hover:shadow-lg hover:shadow-[#c9a84c]/20 hover:scale-105
                transition-all duration-400 btn-glow
              "
            >
              Explore This Journey
              <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
