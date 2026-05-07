import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

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
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};

    if (!email) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Enter a valid email.";
    }

    if (!password) {
      errs.password = "Password is required.";
    }

    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Welcome back!");

      navigate(from, { replace: true });
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        toast.error("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (Provider) => {
    try {
      await signInWithPopup(auth, new Provider());

      toast.success("Logged in successfully!");

      navigate(from, { replace: true });
    } catch {
      toast.error("Sign-in failed. Please try again.");
    }
  };

  return (
    <main className="pt-[72px] min-h-screen bg-cream flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-16 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="bg-forest rounded-sm p-10 text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full border border-cream/10 -translate-y-16 translate-x-16"></div>

            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full border border-cream/10 translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <p className="font-cormorant text-5xl font-semibold leading-tight mb-4">
                Welcome
                <br />
                back,
                <br />
                <span className="text-gold italic">Explorer.</span>
              </p>

              <p className="text-cream/60 text-sm leading-relaxed">
                Log in to access your bookings and plan your next adventure in
                the Bangladesh hill tracts.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white border border-sand rounded-sm p-8 md:p-10">
          <h2 className="font-cormorant text-3xl font-semibold text-forest mb-1">
            Log In
          </h2>

          <p className="text-smoke text-sm mb-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-jade font-medium hover:underline"
            >
              Register here.
            </Link>
          </p>

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke w-4 h-4" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`input-field pl-9 ${
                    errors.email ? "border-amber" : ""
                  }`}
                />
              </div>

              {errors.email && (
                <p className="text-amber text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke w-4 h-4" />

                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className={`input-field pl-9 pr-10 ${
                    errors.password ? "border-amber" : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-forest"
                >
                  {showPw ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-amber text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-sand" />

            <span className="text-xs text-smoke uppercase tracking-wider">
              or
            </span>

            <hr className="flex-1 border-sand" />
          </div>

          {/* PROVIDERS */}
          <div className="space-y-3">
            <button
              onClick={() => handleProvider(GoogleAuthProvider)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-sand rounded-sm text-sm font-medium text-forest hover:border-jade hover:bg-mist/10 transition-all"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={() => handleProvider(GithubAuthProvider)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292e] text-cream rounded-sm text-sm font-medium hover:bg-[#1a1e22] transition-all"
            >
              <FaGithub className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
