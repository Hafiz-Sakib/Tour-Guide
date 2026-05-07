import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import app from "../../Firebase.init";
import CustomLink from "../Utilities/CustomLink";

const auth = getAuth(app);

const LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blogs", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));

    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));

    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-forest/98 backdrop-blur-md shadow-lg shadow-forest/20"
            : "bg-forest/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 2L3 9v11h6v-6h6v6h6V9L12 2z" fill="#0d2818" />
              </svg>
            </div>

            <span className="font-cormorant text-xl font-bold text-cream tracking-wide">
              Wild<span className="text-gold">BD</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.path}>
                <CustomLink
                  to={l.path}
                  className="text-xs font-semibold tracking-[0.1em] uppercase"
                >
                  {l.name}
                </CustomLink>
              </li>
            ))}
          </ul>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border-2 border-gold object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-gold bg-moss flex items-center justify-center text-gold font-semibold text-sm">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}

                  <span className="text-cream/80 text-xs">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-cream/60 border border-cream/20 rounded-sm hover:text-cream hover:border-cream/50 transition-all"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-cream/70 hover:text-cream transition-colors"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="btn-primary !py-2 !px-5 !text-xs"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-cream text-2xl p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-40 bg-forest border-t border-cream/10 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="text-cream/80 hover:text-gold text-sm font-medium tracking-wider uppercase border-b border-cream/5 pb-4"
            >
              {l.name}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <>
                <span className="text-cream/60 text-sm">
                  Hi, {user.displayName || user.email?.split("@")[0]}
                </span>

                <button
                  onClick={handleLogout}
                  className="btn-outline !py-2 !text-xs text-cream border-cream/30 hover:bg-cream hover:text-forest"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-outline !py-2.5 text-cream border-cream/30 text-center"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn-primary text-center"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
