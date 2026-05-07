import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

import toast from "react-hot-toast";

const LINKS = {
  Destinations: ["Bandarban", "Rangamati", "Khagrachari", "Sitakundu"],

  Company: [
    { label: "About Me", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ],

  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");

      return;
    }

    toast.success("Subscribed! You'll hear from me soon.");

    setEmail("");
  };

  return (
    <footer className="bg-forest text-cream">
      {/* NEWSLETTER */}
      <div className="border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="max-w-md">
            <h3 className="font-cormorant text-3xl font-semibold mb-2">
              Stay <em className="text-gold">updated</em>
            </h3>

            <p className="text-cream/60 text-sm">
              Weekly travel tips, seasonal trekking guides, and exclusive
              booking discounts.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex gap-3 w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 bg-moss/40 border border-cream/10 rounded-sm text-sm text-cream placeholder-cream/40 outline-none focus:border-gold transition-colors"
            />

            <button type="submit" className="btn-primary !py-3 !px-5 shrink-0">
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path d="M12 2L3 9v11h6v-6h6v6h6V9L12 2z" fill="#0d2818" />
              </svg>
            </div>

            <span className="font-cormorant text-lg font-bold">
              Wild
              <span className="text-gold">BD</span>
            </span>
          </Link>

          <p className="text-cream/50 text-xs leading-relaxed mb-5">
            Expert-guided tours across Bangladesh's most breathtaking hill
            districts. Safe, authentic, and unforgettable.
          </p>

          <div className="flex gap-3">
            {[
              {
                icon: <FiFacebook />,
                href: "https://facebook.com",
              },
              {
                icon: <FiTwitter />,
                href: "https://twitter.com",
              },
              {
                icon: <FiInstagram />,
                href: "https://instagram.com",
              },
              {
                icon: <FiGithub />,
                href: "https://github.com",
              },
              {
                icon: <FiLinkedin />,
                href: "https://linkedin.com",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 border border-cream/15 rounded-sm flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold transition-all text-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* DESTINATIONS */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-cream/40 mb-4">
            Destinations
          </h4>

          <ul className="space-y-2.5">
            {LINKS.Destinations.map((d) => (
              <li key={d}>
                <Link
                  to="/services"
                  className="text-cream/60 text-sm hover:text-gold transition-colors"
                >
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-cream/40 mb-4">
            Company
          </h4>

          <ul className="space-y-2.5">
            {LINKS.Company.map((c) => (
              <li key={c.label}>
                <Link
                  to={c.path}
                  className="text-cream/60 text-sm hover:text-gold transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-cream/40 mb-4">
            Legal
          </h4>

          <ul className="space-y-2.5">
            {LINKS.Legal.map((l) => (
              <li key={l}>
                <span className="text-cream/60 text-sm cursor-default">
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-cream/40 text-xs">
            © {new Date().getFullYear()} WildBD. All rights reserved.
          </p>

          <p className="text-cream/30 text-xs">
            Designed &amp; built with ♥ for the Bangladesh wilderness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
