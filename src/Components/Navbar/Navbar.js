// src/Components/Navbar/Navbar.js
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  FiChevronDown,
  FiLogOut,
  FiMap,
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

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("sababa-theme") === "dark",
  );

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("sababa-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
    setUserMenuOpen(false);
  };

  const solid = !isHome || scrolled || open;

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-[#e7dfd0] bg-white/95 backdrop-blur-xl shadow-sm text-[#132236]"
            : "border-b border-white/10 bg-transparent text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                solid ? "bg-[#132236] text-white" : "bg-white text-[#132236]"
              } group-hover:scale-110`}
            >
              <FiMap className="text-2xl" />
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tighter">
                Sababa
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.25em] ${solid ? "text-[#0f766e]" : "text-[#f4c76b]"}`}
              >
                TOURS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.path}>
                <CustomLink to={link.path} solid={solid}>
                  {link.name}
                </CustomLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`w-10 h-10 flex items-center justify-center border rounded-2xl transition-all ${
                solid
                  ? "border-[#e7dfd0] hover:bg-[#f6f2ea]"
                  : "border-white/30 hover:bg-white/10"
              }`}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-3xl border transition-all hover:shadow-md ${
                    solid
                      ? "border-[#e7dfd0] bg-white"
                      : "border-white/30 bg-white/10"
                  }`}
                >
                  {/* FIXED PROFILE IMAGE */}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-9 h-9 rounded-2xl object-cover ring-2 ring-white/70"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-gradient-to-br from-[#0f766e] to-[#132236] text-white flex items-center justify-center rounded-2xl font-bold text-lg">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}

                  <div className="text-left pr-2">
                    <p className="text-sm font-semibold truncate max-w-[150px]">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                  </div>
                  <FiChevronDown className="text-lg" />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-[#e7dfd0] shadow-2xl py-2 z-50 overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#e7dfd0]">
                      <p className="text-xs uppercase tracking-widest text-[#65758a]">
                        Signed in as
                      </p>
                      <p className="font-medium mt-1 break-all">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-6 py-4 text-red-600 hover:bg-red-50 transition rounded-b-3xl"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-3 text-sm font-bold transition ${solid ? "text-[#132236]" : "text-white"}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-7 py-3 bg-[#f25f4c] hover:bg-[#d94f3d] text-white text-sm font-bold rounded-3xl transition"
                >
                  Start Trip
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden w-11 h-11 flex items-center justify-center border rounded-2xl text-2xl transition-all ${
              solid ? "border-[#e7dfd0]" : "border-white/30"
            }`}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#132236] pt-24 px-6 text-white md:hidden">
          <div className="flex flex-col gap-6 text-3xl font-black">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
