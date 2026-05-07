// src/Components/Footer/Footer.js
import { Link } from "react-router-dom";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#132236] text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-white text-[#132236] flex items-center justify-center rounded-2xl transition-transform group-hover:rotate-12">
                <FiMapPin className="text-3xl" />
              </div>
              <div>
                <span className="block text-3xl font-black tracking-tighter">
                  Sababa Tours
                </span>
                <span className="text-[#f4c76b] text-xs font-bold uppercase tracking-[0.25em]">
                  BESPOKE TRAVEL
                </span>
              </div>
            </Link>

            <p className="max-w-md text-white/70 leading-relaxed text-[15px]">
              We craft refined, responsible, and unforgettable journeys across
              Bangladesh. Thoughtful planning. Trusted partners. Exceptional
              experiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-10">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaLinkedinIn />, label: "LinkedIn" },
                { icon: <FaTwitter />, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center border border-white/20 rounded-2xl text-white/70 hover:border-[#f4c76b] hover:text-[#f4c76b] transition-all hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-[#f4c76b] uppercase tracking-[0.2em] text-sm font-bold mb-6">
              Explore
            </h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white transition">
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[#f4c76b] uppercase tracking-[0.2em] text-sm font-bold mb-6">
              Services
            </h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Private Tours
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Family Holidays
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Honeymoon Packages
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Corporate Retreats
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-12">
              <h3 className="text-[#f4c76b] uppercase tracking-[0.2em] text-sm font-bold mb-6">
                Concierge Desk
              </h3>
              <div className="space-y-5 text-sm">
                <div className="flex gap-4">
                  <FiMapPin className="mt-1 text-[#f4c76b] flex-shrink-0" />
                  <div>Chittagong, Bangladesh</div>
                </div>
                <div className="flex gap-4">
                  <FiPhone className="mt-1 text-[#f4c76b] flex-shrink-0" />
                  <div>+880 1XXX-XXXXXX</div>
                </div>
                <div className="flex gap-4">
                  <FiMail className="mt-1 text-[#f4c76b] flex-shrink-0" />
                  <div>hello@sababatours.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="max-w-md">
            <p className="text-[#f4c76b] uppercase tracking-widest text-sm font-bold mb-3">
              Stay Inspired
            </p>
            <h4 className="text-2xl font-black leading-tight mb-6">
              Weekly stories from the trails of Bangladesh
            </h4>

            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#f4c76b] transition"
              />
              <button
                type="submit"
                className="px-8 bg-[#f4c76b] text-[#132236] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition"
              >
                Join
              </button>
            </form>
            <p className="text-white/40 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-20 pt-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© {year} Sababa Tours. All rights reserved.</p>
          <p className="text-center md:text-right">
            Crafting exceptional journeys with care and integrity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
