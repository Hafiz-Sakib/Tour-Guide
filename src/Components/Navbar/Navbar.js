// src/Components/Navbar/Navbar.js
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  FiChevronDown,
  FiLogOut,
  FiCompass,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { auth } from "../../Firebase.init";
import CustomLink from "../Utilities/CustomLink";

const links = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/services" },
  { name: "Journal", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const ADMIN_EMAIL = "hafizsakib5@gmail.com";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("sababa-theme") === "dark",
  );
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isAdmin = user?.email === ADMIN_EMAIL;

  /* ─── Auth listener ─── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return unsub;
  }, []);

  /* ─── Scroll detection ─── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Dark mode ─── */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("sababa-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ─── Close menus on route change ─── */
  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  /* ─── Click outside user-menu ─── */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ─── Lock body scroll when mobile menu open ─── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
    setUserMenuOpen(false);
  };

  const solid = !isHome || scrolled || open;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 nav-blur ${
          solid
            ? "bg-white/96 backdrop-blur-2xl border-b border-[#e7dfd0] shadow-[0_2px_24px_rgba(13,31,53,0.07)] text-[#0d1f35]"
            : "bg-transparent border-b border-white/10 text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className={`relative w-10 h-10 flex items-center justify-center rounded-[14px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                solid
                  ? "bg-[#0d1f35] text-white shadow-lg"
                  : "bg-white/12 text-white backdrop-blur border border-white/20"
              }`}
            >
              <FiCompass className="text-xl" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c9a84c] rounded-full border-2 border-white" />
            </div>
            <div>
              <span
                className="block text-[22px] font-black tracking-tight leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sababa
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.32em] ${
                  solid ? "text-[#c9a84c]" : "text-[#c9a84c]"
                }`}
              >
                TOURS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.path}>
                <CustomLink to={link.path} solid={solid}>
                  {link.name}
                </CustomLink>
              </li>
            ))}

            {user && (
              <li>
                <CustomLink
                  to={isAdmin ? "/admin" : "/my-bookings"}
                  solid={solid}
                >
                  {isAdmin ? "Admin Dashboard" : "My Bookings"}
                </CustomLink>
              </li>
            )}
          </ul>

          {/* Right Side - Now Visible on All Devices */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle - Visible on Mobile & Desktop */}
            <button
              onClick={() => setDarkMode((p) => !p)}
              className={`w-10 h-10 flex items-center justify-center rounded-[14px] transition-all duration-300 hover:scale-110 ${
                solid
                  ? "border border-[#e7dfd0] hover:bg-[#f5f0e8] text-[#5a6a7e]"
                  : "border border-white/25 hover:bg-white/10 text-white/80"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun size={17} className="text-[#c9a84c]" />
              ) : (
                <FiMoon size={17} />
              )}
            </button>

            {/* Desktop User Section */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen((p) => !p)}
                    className={`flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border transition-all duration-300 hover:shadow-lg ${
                      solid
                        ? "border-[#e7dfd0] bg-white hover:border-[#c9a84c]/40"
                        : "border-white/25 bg-white/10 hover:bg-white/15 backdrop-blur"
                    }`}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#c9a84c]/30"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0b6b62] to-[#0d1f35] text-white flex items-center justify-center rounded-full font-bold text-sm">
                        {(user.displayName ||
                          user.email ||
                          "U")[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-semibold truncate max-w-[110px]">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2.5 w-60 bg-white rounded-2xl border border-[#e7dfd0] shadow-[0_16px_48px_rgba(13,31,53,0.14)] py-2 z-50 overflow-hidden animate-scale-in">
                      <div className="px-5 py-4 border-b border-[#e7dfd0]">
                        <p className="text-[10px] uppercase tracking-widest text-[#5a6a7e] font-bold">
                          Signed in as
                        </p>
                        <p className="font-semibold mt-1 text-sm break-all text-[#0d1f35]">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition font-medium"
                      >
                        <FiLogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                      solid
                        ? "text-[#0d1f35] hover:bg-[#f5f0e8]"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] text-sm font-black rounded-full hover:shadow-lg hover:shadow-[#c9a84c]/30 hover:scale-105 transition-all duration-300 btn-glow"
                  >
                    Start Trip
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen((p) => !p)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-[14px] transition-all duration-300 text-xl ${
                solid
                  ? "border border-[#e7dfd0] text-[#0d1f35]"
                  : "border border-white/25 text-white"
              }`}
              aria-label="Toggle menu"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0d1f35]/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />

        <div className="relative pt-24 px-8 h-full flex flex-col">
          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-white/10 text-white/80 hover:text-white transition-all duration-300"
                style={{
                  animation: open
                    ? `fadeUp 0.4s var(--ease-expo) ${i * 0.06}s both`
                    : "none",
                }}
              >
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.name}
                </span>
                <span className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                  →
                </span>
              </Link>
            ))}

            {user && (
              <Link
                to={isAdmin ? "/admin" : "/my-bookings"}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-white/10 text-white/80 hover:text-white transition-all duration-300"
                style={{
                  animation: open
                    ? `fadeUp 0.4s var(--ease-expo) ${links.length * 0.06}s both`
                    : "none",
                }}
              >
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isAdmin ? "Admin Dashboard" : "My Bookings"}
                </span>
                <span className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
                  →
                </span>
              </Link>
            )}
          </nav>

          {/* User Section in Mobile Menu */}
          <div className="mt-auto pb-12">
            {user ? (
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-5 flex items-center gap-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#c9a84c]/50"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0b6b62] to-[#0d1f35] text-white flex items-center justify-center rounded-2xl font-bold text-2xl">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                    <p className="text-white/60 text-sm truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full py-4 bg-white/10 hover:bg-red-500/10 border border-white/20 hover:border-red-500/30 text-white hover:text-red-400 rounded-3xl font-medium flex items-center justify-center gap-3 transition-all"
                >
                  <FiLogOut size={18} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-4 text-center border border-white/25 text-white rounded-3xl font-semibold hover:bg-white/10 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-4 text-center bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#0d1f35] rounded-3xl font-black transition hover:scale-105"
                >
                  Start Trip
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
