// src/Components/Footer/Footer.js
import { Link } from "react-router-dom";
import { FiMail, FiMapPin, FiPhone, FiCompass } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#070e1c] text-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(11,107,98,0.12)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.05)_0%,transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* ── Brand ── */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 group w-fit">
              <div className="relative w-12 h-12 bg-white/8 border border-white/12 flex items-center justify-center rounded-[16px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <FiCompass className="text-2xl text-[#c9a84c]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c9a84c] rounded-full" />
              </div>
              <div>
                <span
                  className="block text-3xl font-black tracking-tight leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Sababa Tours
                </span>
                <span className="text-[#c9a84c] text-[9px] font-bold uppercase tracking-[0.28em]">
                  BESPOKE TRAVEL
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-white/55 leading-relaxed text-[15px] mb-10">
              We craft refined, responsible, and unforgettable journeys across
              Bangladesh. Thoughtful planning. Trusted partners. Exceptional
              experiences.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
                { icon: <FaTwitter />, label: "Twitter" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="sababatours.com"
                  aria-label={s.label}
                  className="
                    group w-11 h-11 flex items-center justify-center
                    border border-white/12 rounded-[14px]
                    text-white/50 hover:text-[#c9a84c] hover:border-[#c9a84c]/40
                    hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#c9a84c]/10
                    transition-all duration-300 text-sm
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Explore ── */}
          <div className="lg:col-span-3">
            <h3 className="text-[#c9a84c] uppercase tracking-[0.22em] text-[10px] font-bold mb-7">
              Explore
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Tour Packages", to: "/services" },
                { label: "Travel Journal", to: "/blogs" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group text-white/55 hover:text-white transition-all duration-200 text-sm flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#c9a84c] transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services + Contact ── */}
          <div className="lg:col-span-4">
            <h3 className="text-[#c9a84c] uppercase tracking-[0.22em] text-[10px] font-bold mb-7">
              Services
            </h3>
            <ul className="space-y-4 mb-12">
              {[
                "Private Tours",
                "Family Holidays",
                "Honeymoon Packages",
                "Corporate Retreats",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="group text-white/55 hover:text-white transition-all duration-200 text-sm flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#c9a84c] transition-all duration-300" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[#c9a84c] uppercase tracking-[0.22em] text-[10px] font-bold mb-6">
              Concierge Desk
            </h3>
            <div className="space-y-4 text-sm">
              {[
                { icon: <FiMapPin />, text: "Chittagong, Bangladesh" },
                { icon: <FiPhone />, text: "+880 1XXX-XXXXXX" },
                { icon: <FiMail />, text: "hello@sababatours.com" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-white/55 hover:text-white/80 transition-colors"
                >
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div className="mt-20 pt-14 border-t border-white/8">
          <div className="max-w-md">
            <p className="text-[#c9a84c] uppercase tracking-widest text-[10px] font-bold mb-3">
              Stay Inspired
            </p>
            <h4
              className="text-2xl font-black leading-tight mb-7"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Weekly stories from the trails of Bangladesh
            </h4>
            <form className="flex gap-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="
                  flex-1 bg-white/6 border border-white/12 rounded-2xl
                  px-5 py-4 text-white text-sm placeholder:text-white/35
                  focus:outline-none focus:border-[#c9a84c]/50 transition-all
                "
              />
              <button
                type="submit"
                className="
                  px-7 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a]
                  text-[#0d1f35] font-black uppercase tracking-widest text-xs
                  rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-[#c9a84c]/20
                  transition-all duration-300 whitespace-nowrap btn-glow
                "
              >
                Join
              </button>
            </form>
            <p className="text-white/25 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {year} Sababa Tours. All rights reserved.</p>
          <p>Crafting exceptional journeys with care and integrity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
