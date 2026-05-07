// src/Components/Contact/Contact.js
import { useState } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

const WEB3FORMS_ACCESS_KEY = "fa7f8ec7-a4a8-424b-8efd-9b6387755682";

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#132236]/80 backdrop-blur-sm px-4">
    <div className="relative w-full max-w-md bg-white rounded-3xl p-10 text-center shadow-2xl">
      <button
        onClick={onClose}
        className="absolute right-6 top-6 text-[#65758a] hover:text-[#132236] transition"
        aria-label="Close"
      >
        <FiX size={28} />
      </button>

      <div className="mx-auto w-20 h-20 flex items-center justify-center bg-[#0f766e]/10 rounded-full text-6xl text-[#0f766e] mb-6">
        <FiCheckCircle />
      </div>

      <h3 className="text-3xl font-black text-[#132236]">Message Received</h3>
      <p className="mt-4 text-[#65758a] leading-relaxed">
        Thank you! Our travel desk will reply within 24 hours.
      </p>

      <button
        onClick={onClose}
        className="mt-8 w-full py-4 bg-[#132236] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#0f766e] transition"
      >
        Back to Homepage
      </button>
    </div>
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (errors[event.target.name])
      setErrors({ ...errors, [event.target.name]: "" });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      nextErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    else if (form.message.trim().length < 20)
      nextErrors.message = "Message must be at least 20 characters.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_ACCESS_KEY);
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append(
      "subject",
      form.subject || "New Sababa Tours Contact Form Submission",
    );
    payload.append("message", form.message);
    payload.append("from_name", "Sababa Tours Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error();

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border bg-[#fbf8f2] px-6 py-4 rounded-2xl focus:outline-none text-base transition-all ${
      errors[field]
        ? "border-red-500"
        : "border-[#e7dfd0] focus:border-[#0f766e]"
    }`;

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      {/* Hero */}
      <section className="relative bg-[#132236] py-20 md:py-28 text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=85"
          alt="Travel consultation"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236]/95 via-[#132236]/80 to-[#132236]/70" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[#f4c76b] uppercase tracking-widest text-sm font-bold">
            Concierge Desk
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter">
            Tell us where you want to go.
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Share your vision. We’ll craft the perfect journey for you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 lg:px-10 grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <aside className="space-y-10">
          <div>
            <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
              Concierge Desk
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Planning starts with a good conversation.
            </h2>
            <p className="mt-6 text-lg text-[#65758a]">
              Our team is ready to help shape your dream trip.
            </p>
          </div>

          {[
            {
              icon: <FiMapPin className="text-3xl" />,
              label: "Office",
              value: "Chittagong, Bangladesh",
            },
            {
              icon: <FiMail className="text-3xl" />,
              label: "Email",
              value: "hello@sababatours.com",
            },
            {
              icon: <FiPhone className="text-3xl" />,
              label: "Phone",
              value: "+880 1XXX-XXXXXX",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-6 bg-white border border-[#e7dfd0] p-7 rounded-3xl"
            >
              <div className="text-[#0f766e]">{item.icon}</div>
              <div>
                <p className="font-bold uppercase tracking-widest text-sm text-[#65758a]">
                  {item.label}
                </p>
                <p className="text-lg font-medium mt-1">{item.value}</p>
              </div>
            </div>
          ))}

          <div className="rounded-3xl overflow-hidden border border-[#e7dfd0]">
            <iframe
              title="Sababa Tours location"
              src="https://maps.google.com/maps?q=Chittagong+Bangladesh&output=embed"
              width="100%"
              height="300"
              className="w-full"
              loading="lazy"
            />
          </div>
        </aside>

        {/* Contact Form - More Compact */}
        <div className="bg-white border border-[#e7dfd0] rounded-3xl p-8 md:p-10 shadow-sm">
          <p className="text-[#0f766e] uppercase tracking-widest text-sm font-bold">
            Trip Inquiry
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Request a custom plan.
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-2">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Private trip inquiry"
                className={inputClass("subject")}
              />
              {errors.subject && (
                <p className="mt-1 text-red-600 text-sm">{errors.subject}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#65758a] mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us your destination, preferred dates, group size, and travel style..."
                className={`${inputClass("message")} resize-none min-h-[120px]`}
              />
              {errors.message && (
                <p className="mt-1 text-red-600 text-sm">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#132236] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#0f766e] transition disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {loading ? "Sending..." : "Send Inquiry"} <FiSend />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
