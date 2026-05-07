import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    if (errors[event.target.name]) setErrors({ ...errors, [event.target.name]: "" });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email) nextErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email.";
    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    else if (form.message.trim().length < 20) nextErrors.message = "Message must be at least 20 characters.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent. Our travel desk will reply within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 900);
  };

  const inputClass = (field) =>
    `w-full border bg-[#fbf8f2] px-4 py-4 text-sm text-[#132236] placeholder:text-[#65758a]/60 focus:outline-none ${
      errors[field] ? "border-[#d94f3d]" : "border-[#e7dfd0] focus:border-[#0f766e]"
    }`;

  return (
    <main className="min-h-screen bg-[#f6f2ea] pt-[76px] text-[#132236]">
      <section className="relative overflow-hidden bg-[#132236] py-24 text-white">
        <img
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=85"
          alt="Travel consultation"
          className="absolute inset-0 h-full w-full object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132236] via-[#132236]/84 to-[#132236]/44" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f4c76b]">Contact</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Tell us where you want to go.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68">
            Share your travel dates, group size, and priorities. We will reply with a practical next step.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.75fr_1fr] lg:px-10">
        <aside className="space-y-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Concierge Desk</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Planning starts with a good conversation.</h2>
            <p className="mt-5 text-sm leading-7 text-[#65758a]">
              Our team can help compare destinations, estimate costs, adjust package details, and plan private or group travel.
            </p>
          </div>

          {[
            { icon: <FiMapPin />, label: "Office", value: "Chittagong, Bangladesh" },
            { icon: <FiMail />, label: "Email", value: "hello@sababatours.com" },
            { icon: <FiPhone />, label: "Phone", value: "+880 1XXX-XXXXXX" },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 border border-[#e7dfd0] bg-white p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#0f766e]/10 text-xl text-[#0f766e]">
                {item.icon}
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#65758a]">{item.label}</p>
                <p className="mt-1 font-bold">{item.value}</p>
              </div>
            </div>
          ))}

          <iframe
            title="Sababa Tours location"
            src="https://maps.google.com/maps?q=Chittagong+Bangladesh&output=embed"
            width="100%"
            height="240"
            className="border border-[#e7dfd0]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </aside>

        <form onSubmit={handleSubmit} className="border border-[#e7dfd0] bg-white p-7 shadow-sm md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Trip Inquiry</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Request a custom plan.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass("name")} />
              {errors.name && <p className="mt-2 text-xs font-bold text-[#d94f3d]">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass("email")} />
              {errors.email && <p className="mt-2 text-xs font-bold text-[#d94f3d]">{errors.email}</p>}
            </div>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Private trip inquiry" className={inputClass("subject")} />
            {errors.subject && <p className="mt-2 text-xs font-bold text-[#d94f3d]">{errors.subject}</p>}
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#65758a]">Message</label>
            <textarea
              name="message"
              rows="7"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us your destination, dates, group size, and travel style."
              className={`${inputClass("message")} resize-none`}
            />
            {errors.message && <p className="mt-2 text-xs font-bold text-[#d94f3d]">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex items-center gap-2 bg-[#132236] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#0f766e] disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Inquiry"} <FiSend />
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
