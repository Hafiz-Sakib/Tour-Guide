import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiShield, FiStar } from "react-icons/fi";
import { FaMountain } from "react-icons/fa";

import ServiceCard from "../Services/ServiceCard";
import Review from "./Review";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Happy Travelers" },
  { value: "12", label: "Destinations" },
  { value: "100%", label: "Safety Record" },
];

const FEATURES = [
  {
    icon: <FiCompass className="w-6 h-6" />,
    title: "Secret Locations",
    desc: "I know hidden trails and secret spots most tourists never discover — from Bandarban to Sitakundu.",
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: "Safe Adventure",
    desc: "15 years of experience navigating these terrains means every trip is planned with your safety first.",
  },
  {
    icon: <FaMountain className="w-5 h-5" />,
    title: "Expert Hiking",
    desc: "Whether you're a beginner or seasoned hiker, I tailor every journey to match your pace and goals.",
  },
  {
    icon: <FiStar className="w-6 h-6" />,
    title: "Premium Service",
    desc: "Small group sizes, personalized attention, and an unforgettable experience from start to finish.",
  },
];

const DESTINATIONS = [
  {
    name: "Bandarban",
    tagline: "Hill Tracts & Waterfalls",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80",
    duration: "3–5 days",
  },
  {
    name: "Rangamati",
    tagline: "Lake & Tribal Culture",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    duration: "2–4 days",
  },
  {
    name: "Khagrachari",
    tagline: "Dense Forest Trails",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    duration: "2–3 days",
  },
  {
    name: "Sitakundu",
    tagline: "Chandranath Hills",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    duration: "1–2 days",
  },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Hafiz-Sakib/FakeData/main/FakeData.json",
    )
      .then((r) => r.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-forest overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80')",
          }}
        />

        <div className="absolute right-[-8%] top-[10%] w-[500px] h-[500px] rounded-full border border-gold/10 hidden lg:block"></div>

        <div className="absolute right-[-4%] top-[15%] w-[360px] h-[360px] rounded-full border border-gold/15 hidden lg:block"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="section-eyebrow mb-6">
              <span className="eyebrow-text">Bangladesh · Hill Tracts</span>
            </div>

            <h1 className="font-cormorant text-5xl md:text-7xl font-semibold text-cream leading-[1.05] mb-6">
              Mountains,
              <br />
              <span className="italic text-gold">Waterfalls</span> &
              <br />
              Wild Trails.
            </h1>

            <p className="text-cream/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Explore the untamed beauty of Bandarban, Rangamati, Khagrachari &
              Sitakundu with an expert guide who's called these hills home for
              15 years.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn-primary">
                Explore Tours <FiArrowRight />
              </Link>

              <Link to="/about" className="btn-white">
                Meet Your Guide
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-cream/10 pt-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-cormorant text-4xl font-bold text-gold">
                  {s.value}
                </p>

                <p className="text-cream/50 text-xs tracking-widest uppercase mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-10 mb-16 items-end">
            <div>
              <div className="section-eyebrow">
                <span className="eyebrow-text">Why Choose Me</span>
              </div>

              <h2 className="section-title">
                Your safety is my
                <br />
                <em>top priority</em>
              </h2>
            </div>

            <p className="section-subtitle md:self-end">
              I combine 15+ years of local expertise with a genuine passion for
              nature to create journeys that are safe, immersive, and truly
              memorable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-7 border border-sand bg-white rounded-sm group hover:border-jade transition-colors duration-300 card-hover"
              >
                <div className="w-12 h-12 rounded-sm bg-mist/30 flex items-center justify-center text-jade mb-5 group-hover:bg-jade group-hover:text-cream transition-all duration-300">
                  {f.icon}
                </div>

                <h3 className="font-semibold text-forest mb-2">{f.title}</h3>

                <p className="text-smoke text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-24 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-eyebrow">
                <span className="eyebrow-text">Popular Routes</span>
              </div>

              <h2 className="section-title">Where I guide you</h2>
            </div>

            <Link to="/services" className="btn-ghost shrink-0">
              View all destinations <FiArrowRight />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                to="/services"
                className="group relative overflow-hidden rounded-sm aspect-[3/4] block"
              >
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-5">
                  <span className="badge mb-2">{d.duration}</span>

                  <h3 className="text-cream font-cormorant text-2xl font-semibold">
                    {d.name}
                  </h3>

                  <p className="text-cream/60 text-xs tracking-wider">
                    {d.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <div className="section-eyebrow justify-center">
              <span className="eyebrow-text">Tour Packages</span>
            </div>

            <h2 className="section-title">Featured experiences</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-2 border-jade border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline">
              See All Packages <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden bg-forest">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80')",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Ready to Explore?
          </p>

          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream mb-6 leading-tight">
            Book your adventure today
          </h2>

          <p className="text-cream/60 text-base leading-relaxed mb-10">
            Limited spots available every month. Secure your journey now and
            experience Bangladesh's hill tracts like never before.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary">
              Get Started <FiArrowRight />
            </Link>

            <Link to="/contact" className="btn-white">
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Review />
    </main>
  );
};

export default Home;
