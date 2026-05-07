import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import toast from "react-hot-toast";
import app from "../../Firebase.init";

const auth = getAuth(app);

const PwRule = ({ met, label }) => (
  <li
    className={`flex items-center gap-1.5 text-xs ${
      met ? "text-jade" : "text-smoke"
    }`}
  >
    {met ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}

    {label}
  </li>
);

const Registration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const validate = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = "Full name is required.";
    }

    if (!email) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Enter a valid email.";
    }

    if (!password) {
      errs.password = "Password is required.";
    } else if (!Object.values(rules).every(Boolean)) {
      errs.password = "Password doesn't meet requirements.";
    }

    if (!confirm) {
      errs.confirm = "Please confirm your password.";
    } else if (confirm !== password) {
      errs.confirm = "Passwords do not match.";
    }

    return errs;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, {
        displayName: name,
      });

      toast.success("Account created! Welcome aboard.");

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Try logging in.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (Provider) => {
    try {
      await signInWithPopup(auth, new Provider());

      toast.success("Registered successfully!");

      navigate("/");
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
                Begin your
                <br />
                <span className="text-gold italic">journey.</span>
              </p>

              <p className="text-cream/60 text-sm leading-relaxed">
                Create an account to browse, book, and manage your adventure
                packages across Bangladesh's most breathtaking destinations.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white border border-sand rounded-sm p-8 md:p-10">
          <h2 className="font-cormorant text-3xl font-semibold text-forest mb-1">
            Create Account
          </h2>

          <p className="text-smoke text-sm mb-7">
            Already have an account?{" "}
            <Link to="/login" className="text-jade font-medium hover:underline">
              Log in here.
            </Link>
          </p>

          <form onSubmit={handleRegister} noValidate className="space-y-4">
            {/* NAME */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke w-4 h-4" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={`input-field pl-9 ${
                    errors.name ? "border-amber" : ""
                  }`}
                />
              </div>

              {errors.name && (
                <p className="text-amber text-xs mt-1">{errors.name}</p>
              )}
            </div>

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
                  onFocus={() => setPwFocus(true)}
                  onBlur={() => setPwFocus(false)}
                  placeholder="Create a strong password"
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

              {(pwFocus || errors.password) && (
                <ul className="mt-2 space-y-0.5 bg-cream px-3 py-2 rounded-sm">
                  <PwRule met={rules.length} label="At least 8 characters" />

                  <PwRule met={rules.upper} label="One uppercase letter" />

                  <PwRule met={rules.lower} label="One lowercase letter" />

                  <PwRule met={rules.number} label="One number" />
                </ul>
              )}
            </div>

            {/* CONFIRM */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke w-4 h-4" />

                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  className={`input-field pl-9 ${
                    errors.confirm ? "border-amber" : ""
                  }`}
                />
              </div>

              {errors.confirm && (
                <p className="text-amber text-xs mt-1">{errors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account…" : "Create Account"}
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

export default Registration;
