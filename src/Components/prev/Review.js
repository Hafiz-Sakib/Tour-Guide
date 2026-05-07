import { FiStar } from "react-icons/fi";

const REVIEWS = [
  {
    name: "Maria Smantha",
    role: "Banker",
    rating: 4.5,
    text: "My family had the most incredible experience in Bandarban. The guide knew every hidden waterfall and made us feel completely safe throughout the trek.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Lisa Cudrow",
    role: "Physician",
    rating: 5,
    text: "Absolutely professional and genuinely warm. The Rangamati trip was beyond expectation — from the boat rides to the tribal village visits.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "John Smith",
    role: "Marketing Manager",
    rating: 4,
    text: "We were a group of 20 and the experience was seamlessly organized. Khagrachari felt like an entirely different world — breathtaking!",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <FiStar
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? "text-gold fill-gold"
              : i - 0.5 <= rating
                ? "text-gold fill-gold/50"
                : "text-sand"
          }`}
          style={{
            fill:
              i <= Math.floor(rating)
                ? "#e4a63a"
                : i - 0.5 <= rating
                  ? "rgba(228,166,58,0.5)"
                  : "none",
          }}
        />
      ))}
    </div>
  );
};

const Review = () => {
  return (
    <section className="py-24 bg-sand/40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="section-eyebrow justify-center">
            <span className="eyebrow-text">Client Stories</span>
          </div>

          <h2 className="section-title">What travelers say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white p-8 rounded-sm border border-sand card-hover"
            >
              <StarRating rating={r.rating} />

              <p className="text-smoke text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-sand">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-forest text-sm">{r.name}</p>

                  <p className="text-smoke text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
