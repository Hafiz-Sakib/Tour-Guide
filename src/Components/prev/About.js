import { Link } from "react-router-dom";
import { FiArrowRight, FiAward, FiMapPin, FiUsers } from "react-icons/fi";

const TIMELINE = [
  {
    year: "2008",
    event: "Started guiding solo hikers in the Bandarban hills",
  },
  {
    year: "2012",
    event: "Expanded to Rangamati & Khagrachari routes",
  },
  {
    year: "2016",
    event: "Certified first-aid & wilderness safety training",
  },
  {
    year: "2020",
    event: "Launched WildBD as a professional guiding service",
  },
  {
    year: "2024",
    event: "500+ happy travelers and 12 active destinations",
  },
];

const SKILLS = [
  { label: "Trail Navigation", pct: 98 },
  { label: "Tribal Culture Knowledge", pct: 90 },
  { label: "Wildlife Identification", pct: 85 },
  { label: "Emergency Preparedness", pct: 92 },
];

const About = () => {
  return (
    <main className="pt-[72px] bg-cream min-h-screen">
      {/* HEADER */}
      <div className="bg-forest py-20 px-6 text-center">
        <div className="section-eyebrow justify-center mb-4">
          <span className="eyebrow-text text-gold/80">Your Guide</span>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream">
          About Me
        </h1>
      </div>

      {/* PROFILE */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80"
              alt="Tour Guide"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FLOATING BADGE */}
          <div className="absolute -bottom-6 -right-6 bg-gold p-5 rounded-sm shadow-lg hidden md:block">
            <p className="font-cormorant text-3xl font-bold text-forest leading-none">
              15+
            </p>

            <p className="text-forest text-xs font-semibold tracking-wider uppercase">
              Years
            </p>
          </div>
        </div>

        <div>
          <div className="section-eyebrow mb-3">
            <span className="eyebrow-text">Hafiz Sakib</span>
          </div>

          <h2 className="section-title mb-4">
            Professional
            <br />
            <em>wilderness guide</em>
          </h2>

          <p className="text-smoke text-sm leading-relaxed mb-4">
            I'm a native of Chittagong with deep roots in the hill tracts of
            Bangladesh. What began as a personal passion for trekking evolved
            into a career dedicated to sharing these landscapes with curious,
            adventurous travelers from around the world.
          </p>

          <p className="text-smoke text-sm leading-relaxed mb-8">
            I hold first-aid and wilderness safety certifications and maintain
            close relationships with local communities — ensuring every trip is
            not only safe and authentic, but also respectful of the environment
            and the people who call these hills home.
          </p>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: <FiAward />,
                value: "500+",
                label: "Happy Clients",
              },
              {
                icon: <FiMapPin />,
                value: "12",
                label: "Destinations",
              },
              {
                icon: <FiUsers />,
                value: "98%",
                label: "Return Rate",
              },
            ].map((h) => (
              <div
                key={h.label}
                className="text-center p-4 bg-white border border-sand rounded-sm"
              >
                <div className="text-jade flex justify-center mb-1">
                  {h.icon}
                </div>

                <p className="font-cormorant text-2xl font-bold text-forest">
                  {h.value}
                </p>

                <p className="text-smoke text-xs">{h.label}</p>
              </div>
            ))}
          </div>

          <Link to="/contact" className="btn-primary">
            Get In Touch <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-sand/40 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div>
            <div className="section-eyebrow mb-3">
              <span className="eyebrow-text">Expertise</span>
            </div>

            <h2 className="section-title mb-6">Core skills</h2>

            <div className="space-y-5">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm font-medium text-forest mb-1.5">
                    <span>{s.label}</span>

                    <span className="text-jade">{s.pct}%</span>
                  </div>

                  <div className="h-1.5 bg-sand rounded-full overflow-hidden">
                    <div
                      className="h-full bg-jade rounded-full"
                      style={{ width: `${s.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="section-eyebrow mb-3">
              <span className="eyebrow-text">Journey</span>
            </div>

            <h2 className="section-title mb-6">My timeline</h2>

            <div className="relative pl-6 border-l border-sand space-y-6">
              {TIMELINE.map((t) => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full border-2 border-jade bg-cream"></div>

                  <p className="text-xs font-semibold tracking-wider uppercase text-amber mb-1">
                    {t.year}
                  </p>

                  <p className="text-smoke text-sm">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
