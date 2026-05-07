import { Link } from "react-router-dom";
import { FiArrowRight, FiMail, FiMap, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Tour Packages", to: "/services" },
      { label: "Travel Journal", to: "/blogs" },
      { label: "About Agency", to: "/about" },
      { label: "Contact Team", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Private Tours", to: "/services" },
      { label: "Family Holidays", to: "/services" },
      { label: "Honeymoon Trips", to: "/services" },
      { label: "Corporate Retreats", to: "/services" },
    ],
  },
];

const socials = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaInstagram />, label: "Instagram" },
  { icon: <FaLinkedinIn />, label: "LinkedIn" },
  { icon: <FaTwitter />, label: "Twitter" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#132236] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center bg-white text-[#132236]">
                <FiMap className="text-xl" />
              </span>
              <span>
                <span className="block text-xl font-black">Sababa Tours</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#f4c76b]">
                  Travel Agency
                </span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/62">
              Premium travel planning for Bangladesh and beyond. We design trips with thoughtful pacing, trusted operators, and clear support.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  type="button"
                  className="flex h-10 w-10 items-center justify-center border border-white/16 text-white/70 transition hover:border-[#f4c76b] hover:text-[#f4c76b]"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#f4c76b]">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/62 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#f4c76b]">Concierge Desk</h3>
            <div className="mt-5 space-y-4 text-sm text-white/66">
              <p className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-[#f4c76b]" /> Chittagong, Bangladesh
              </p>
              <p className="flex items-start gap-3">
                <FiPhone className="mt-1 text-[#f4c76b]" /> +880 1XXX-XXXXXX
              </p>
              <p className="flex items-start gap-3">
                <FiMail className="mt-1 text-[#f4c76b]" /> hello@sababatours.com
              </p>
            </div>
            <form onSubmit={(event) => event.preventDefault()} className="mt-6 flex border border-white/16 bg-white/8">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/36 focus:outline-none"
              />
              <button className="bg-[#f25f4c] px-4 text-white" aria-label="Subscribe">
                <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>Copyright {year} Sababa Tours. All rights reserved.</p>
          <p>Designed for refined, reliable travel planning.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
