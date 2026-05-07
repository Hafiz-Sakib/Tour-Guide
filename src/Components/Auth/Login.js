import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";
import app from "../../Firebase.init";

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!email) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      nextErrors.email = "Enter a valid email.";
    if (!password) nextErrors.password = "Password is required.";
    return nextErrors;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back.");
      navigate(from, { replace: true });
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (Provider) => {
    try {
      await signInWithPopup(auth, new Provider());
      toast.success("Signed in successfully.");
      navigate(from, { replace: true });
    } catch {
      toast.error("Sign-in failed. Please try again.");
    }
  };

  const inputClass = (field) =>
    `w-full border bg-[#fbf8f2] py-4 pl-11 pr-4 text-sm text-[#132236] placeholder:text-[#65758a]/60 focus:outline-none ${
      errors[field]
        ? "border-[#d94f3d]"
        : "border-[#e7dfd0] focus:border-[#0f766e]"
    }`;

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 lg:px-10">
        <div className="relative hidden min-h-[620px] overflow-hidden bg-[#132236] md:block">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85"
            alt="Traveler sign in"
            className="absolute inset-0 h-full w-full object-cover opacity-46"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132236] via-[#132236]/55 to-transparent" />
          <div className="absolute bottom-0 p-10 text-white">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">
              Client Portal
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight">
              Your trips, beautifully organized.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Sign in to continue planning, request bookings, and manage your
              travel conversations.
            </p>
          </div>
        </div>

        <div className="border border-[#e7dfd0] bg-white p-7 shadow-sm md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
            Welcome Back
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Sign in</h2>
          <p className="mt-2 text-sm text-[#65758a]">
            New here?{" "}
            <Link to="/register" className="font-black text-[#f25f4c]">
              Create an account
            </Link>
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-xs font-bold text-[#d94f3d]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  className={`${inputClass("password")} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#65758a]"
                  aria-label="Toggle password"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs font-bold text-[#d94f3d]">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#132236] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#0f766e] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"} <FiArrowRight />
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#e7dfd0]" />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#65758a]">
              or
            </span>
            <span className="h-px flex-1 bg-[#e7dfd0]" />
          </div>

          <div className="grid gap-3">
            <button
              onClick={() => handleProvider(GoogleAuthProvider)}
              className="flex items-center justify-center gap-3 border border-[#e7dfd0] px-5 py-4 text-sm font-bold transition hover:border-[#0f766e]"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
            <button
              onClick={() => handleProvider(GithubAuthProvider)}
              className="flex items-center justify-center gap-3 bg-[#24292f] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#15191d]"
            >
              <FaGithub className="text-xl" /> Continue with GitHub
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
