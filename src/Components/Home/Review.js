// src/Components/Home/Review.js
import { useEffect, useRef } from "react";
import { FiStar } from "react-icons/fi";
import nadiaImg from "../../assets/Review/nadia.png";
import sabnamImg from "../../assets/Review/sabnam.jpg";
import sakibImg from "../../assets/Review/sakib.png";

const reviews = [
  {
    name: "Nadia Rahman",
    role: "Family Traveler",
    text: "Sababa made our Cox's Bazar and Bandarban itinerary feel effortless. Every transfer, stay, and guide was exactly as promised.",
    avatar: nadiaImg,
    rating: 5,
  },
  {
    name: "Sabnam Chowdhury",
    role: "Corporate Retreat Lead",
    text: "The planning was polished and practical. Our team retreat had the right balance of adventure, comfort, and downtime.",
    avatar: sabnamImg,
    rating: 5,
  },
  {
    name: "Sakib",
    role: "Solo Explorer",
    text: "I wanted local insight without stress. The team handled every detail and still gave me space to explore at my own pace.",
    avatar: sakibImg,
    rating: 4.5,
  },
  {
    name: "Tanvir Hasan",
    role: "Adventure Traveler",
    text: "The entire trip felt smooth and well-organized. From transport to local guides, everything was handled perfectly while still giving us freedom to enjoy the journey.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Family Vacationer",
    text: "Traveling with kids can be stressful, but this experience was incredibly comfortable and enjoyable. The accommodations and support exceeded our expectations.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Mehedi Rahman",
    role: "Nature Enthusiast",
    text: "I loved discovering hidden spots and scenic locations that I would never have found on my own. The trip felt authentic and unforgettable.",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    rating: 4,
  },
  {
    name: "Farzana Akter",
    role: "Couple Traveler",
    text: "Our honeymoon tour was beautifully arranged with amazing attention to detail. Every destination felt special and relaxing.",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    rating: 5,
  },
  {
    name: "Rakib Chowdhury",
    role: "Weekend Explorer",
    text: "Perfect short getaway! The itinerary was balanced, the local food recommendations were excellent, and the overall experience was worth every moment.",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    rating: 4,
  },
];

const Review = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#f5f0e8] py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a84c]/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#0b6b62]/5 translate-x-1/3 translate-y-1/3" />

      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[#0b6b62] uppercase tracking-[0.25em] text-xs font-bold mb-4">
              Traveler Stories
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0d1f35] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Trusted by guests who
              <br />
              value thoughtful planning.
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex gap-0.5 text-[#c9a84c]">
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="h-6 w-px bg-[#e7dfd0]" />
            <span className="text-sm font-black text-[#0d1f35]">
              4.9 Average
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="
                group relative bg-white border border-[#e7dfd0] p-8 rounded-[28px]
                hover:border-[#c9a84c]/30 hover:shadow-[0_24px_64px_rgba(13,31,53,0.1)]
                transition-all duration-500 hover:-translate-y-2 card-premium overflow-hidden
              "
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#0b6b62] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[28px]" />

              {/* Quote mark */}
              <div
                className="text-8xl leading-none text-[#c9a84c]/12 font-black absolute top-4 right-6 select-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-[#c9a84c] mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-[17px] leading-relaxed text-[#5a6a7e] italic mb-8 relative">
                "{r.text}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#e7dfd0]">
                <div className="relative">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-13 h-13 w-[52px] h-[52px] rounded-full object-cover ring-2 ring-[#c9a84c]/25 group-hover:ring-[#c9a84c]/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <p className="font-black text-[#0d1f35] text-sm">{r.name}</p>
                  <p className="text-xs text-[#5a6a7e] mt-0.5">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
