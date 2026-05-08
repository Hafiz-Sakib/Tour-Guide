import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiX,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import app from "../../Firebase.init";

const auth = getAuth(app);

const Rule = ({ met, label }) => (
  <li
    className={`flex items-center gap-2 text-xs font-bold ${met ? "text-[#0f766e]" : "text-[#65758a]"}`}
  >
    {met ? <FiCheck /> : <FiX />} {label}
  </li>
);

const Registration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Full name is required.";
    if (!email) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      nextErrors.email = "Enter a valid email.";
    if (!Object.values(rules).every(Boolean))
      nextErrors.password = "Password does not meet requirements.";
    if (confirm !== password) nextErrors.confirm = "Passwords do not match.";
    return nextErrors;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
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
      await updateProfile(user, { displayName: name });
      toast.success("Account created. Welcome to Sababa Tours.");
      navigate("/");
    } catch (error) {
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (Provider) => {
    try {
      await signInWithPopup(auth, new Provider());
      toast.success("Account ready.");
      navigate("/");
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
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 md:grid-cols-2 lg:px-10">
        <div className="relative hidden min-h-[720px] overflow-hidden bg-[#132236] md:block">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=85"
            alt="Create travel account"
            className="absolute inset-0 h-full w-full object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#132236] via-[#132236]/55 to-transparent" />
          <div className="absolute bottom-0 p-10 text-white">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">
              Start Planning
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight">
              Your next journey deserves a better desk.
            </h1>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Create an account to request trips and keep your planning
              conversations in one place.
            </p>
          </div>
        </div>

        <div className="border border-[#e7dfd0] bg-white p-7 shadow-sm md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
            Create Account
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Join Sababa Tours
          </h2>
          <p className="mt-2 text-sm text-[#65758a]">
            Already registered?{" "}
            <Link to="/login" className="font-black text-[#f25f4c]">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className={inputClass("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-xs font-bold text-[#d94f3d]">
                  {errors.name}
                </p>
              )}
            </div>

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
                  placeholder="Create a strong password"
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
              <ul className="mt-3 grid gap-2 border border-[#e7dfd0] bg-[#fbf8f2] p-4 sm:grid-cols-2">
                <Rule met={rules.length} label="8 characters" />
                <Rule met={rules.upper} label="Uppercase" />
                <Rule met={rules.lower} label="Lowercase" />
                <Rule met={rules.number} label="Number" />
              </ul>
              {errors.password && (
                <p className="mt-2 text-xs font-bold text-[#d94f3d]">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#65758a]" />
                <input
                  type="password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  placeholder="Repeat password"
                  className={inputClass("confirm")}
                />
              </div>
              {errors.confirm && (
                <p className="mt-2 text-xs font-bold text-[#d94f3d]">
                  {errors.confirm}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#132236] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#0f766e] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"} <FiArrowRight />
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
