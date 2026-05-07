import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  FiChevronDown,
  FiLogOut,
  FiMap,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import app from "../../Firebase.init";
import CustomLink from "../Utilities/CustomLink";

const auth = getAuth(app);

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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sababa-theme") === "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser || null),
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("sababa-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    signOut(auth).then(() => navigate("/"));
    setUserMenuOpen(false);
  };

  const solid = !isHome || scrolled || open;
  const toggleClass = solid
    ? "border-[#e7dfd0] bg-[#fbf8f2] text-[#132236] hover:border-[#0f766e]"
    : "border-white/20 bg-white/10 text-white hover:border-white/60";

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
          solid
            ? "border-[#e7dfd0]/80 bg-white/95 text-[#132236] shadow-sm backdrop-blur-xl"
            : "border-white/10 bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center ${solid ? "bg-[#132236] text-white" : "bg-white text-[#132236]"}`}
            >
              <FiMap className="text-xl" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black tracking-tight">
                Sababa Tours
              </span>
              <span
                className={`block text-[10px] font-bold uppercase tracking-[0.24em] ${solid ? "text-[#0f766e]" : "text-[#f4c76b]"}`}
              >
                Travel Agency
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.path}>
                <CustomLink to={link.path} solid={solid}>
                  {link.name}
                </CustomLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className={`flex h-10 w-10 items-center justify-center border text-lg transition ${toggleClass}`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              title={darkMode ? "Light mode" : "Dark mode"}
              type="button"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((value) => !value)}
                  className={`flex items-center gap-2 border px-4 py-2 text-sm font-bold transition ${
                    solid
                      ? "border-[#e7dfd0] bg-[#fbf8f2]"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-7 w-7 object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center bg-[#0f766e] text-xs text-white">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <FiChevronDown />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 border border-[#e7dfd0] bg-white p-2 text-[#132236] shadow-2xl">
                    <div className="border-b border-[#e7dfd0] px-3 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#65758a]">
                        Signed in
                      </p>
                      <p className="mt-1 truncate text-sm font-bold">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className="mt-2 flex w-full items-center gap-2 px-3 py-3 text-left text-sm font-bold text-[#d94f3d] hover:bg-[#fbf8f2]"
                    >
                      <FiLogOut /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-3 text-xs font-black uppercase tracking-[0.16em] ${solid ? "text-[#132236]" : "text-white"}`}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-[#f25f4c] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#d94f3d]"
                >
                  Start Trip
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className={`flex h-11 w-11 items-center justify-center border text-xl ${toggleClass}`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              type="button"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={() => setOpen((value) => !value)}
              className={`flex h-11 w-11 items-center justify-center border text-xl ${
                solid
                  ? "border-[#e7dfd0] text-[#132236]"
                  : "border-white/20 text-white"
              }`}
              aria-label="Toggle navigation"
              type="button"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#132236] px-6 pt-28 text-white transition md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block border-b border-white/10 py-5 text-3xl font-black"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-3">
          {user ? (
            <button
              onClick={logout}
              className="border border-white/20 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#f4c76b]"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-white/20 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em]"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-[#f25f4c] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em]"
              >
                Start Trip
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
