import { useState } from "react";

import { FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";

import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Name is required.";
    }

    if (!form.email) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email.";
    }

    if (!form.subject.trim()) {
      errs.subject = "Subject is required.";
    }

    if (!form.message.trim()) {
      errs.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      errs.message = "Message must be at least 20 characters.";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you within 24 hours.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setLoading(false);
    }, 1200);
  };

  const INFO = [
    {
      icon: <FiMapPin />,
      label: "Location",
      value: "Chittagong, Bangladesh",
    },
    {
      icon: <FiMail />,
      label: "Email",
      value: "hello@wildbd.com",
    },
    {
      icon: <FiPhone />,
      label: "Phone",
      value: "+880 1XXX-XXXXXX",
    },
  ];

  return (
    <main className="pt-[72px] bg-cream min-h-screen">
      {/* HEADER */}
      <div className="bg-forest py-20 px-6 text-center">
        <div className="section-eyebrow justify-center mb-4">
          <span className="eyebrow-text text-gold/80">Get in Touch</span>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream">
          Contact Me
        </h1>

        <p className="text-cream/60 max-w-md mx-auto text-sm leading-relaxed mt-4">
          Have questions about a tour? Ready to book? I reply to every message
          within 24 hours.
        </p>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-5 gap-12">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="section-eyebrow mb-3">
              <span className="eyebrow-text">Reach out</span>
            </div>

            <h2 className="section-title mb-4 text-3xl">
              Let's plan your adventure
            </h2>

            <p className="text-smoke text-sm leading-relaxed">
              Whether you're a first-time hiker or a seasoned trekker, I'm here
              to help craft the perfect itinerary for you.
            </p>
          </div>

          {/* INFO */}
          <div className="space-y-5">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-mist/30 rounded-sm flex items-center justify-center text-jade shrink-0">
                  {item.icon}
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-smoke mb-0.5">
                    {item.label}
                  </p>

                  <p className="text-forest text-sm font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="rounded-sm overflow-hidden border border-sand">
            <iframe
              title="Location"
              src="https://maps.google.com/maps?q=Chittagong+Bangladesh&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-3">
          <div className="bg-white border border-sand rounded-sm p-8 md:p-10">
            <div className="section-eyebrow mb-3">
              <span className="eyebrow-text">Send Message</span>
            </div>

            <h2 className="section-title text-3xl mb-8">
              Tell me about your trip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`input-field ${errors.name ? "border-amber" : ""}`}
                />

                {errors.name && (
                  <p className="text-amber text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field ${
                    errors.email ? "border-amber" : ""
                  }`}
                />

                {errors.email && (
                  <p className="text-amber text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Tour inquiry"
                  className={`input-field ${
                    errors.subject ? "border-amber" : ""
                  }`}
                />

                {errors.subject && (
                  <p className="text-amber text-xs mt-1">{errors.subject}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-xs font-semibold tracking-wider uppercase text-forest block mb-1.5">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your travel plans..."
                  className={`input-field resize-none ${
                    errors.message ? "border-amber" : ""
                  }`}
                ></textarea>

                {errors.message && (
                  <p className="text-amber text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}

                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
