// src/Components/Review.js
import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Nadia Rahman",
    role: "Family traveler",
    text: "Sababa made our Cox's Bazar and Bandarban itinerary feel effortless. Every transfer, stay, and guide was exactly as promised.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Amin Chowdhury",
    role: "Corporate retreat lead",
    text: "The planning was polished and practical. Our team retreat had the right balance of adventure, comfort, and downtime.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Miller",
    role: "Solo explorer",
    text: "I wanted local insight without stress. The team handled the details and still gave me space to explore at my own pace.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Review = () => (
  <section className="bg-[#f6f2ea] py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[#0f766e] uppercase tracking-[0.22em] text-sm font-bold">
            Traveler Stories
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-[#132236] leading-tight">
            Trusted by guests who value thoughtful planning.
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[#f4c76b]">
          {[1, 2, 3, 4, 5].map((i) => (
            <FiStar key={i} className="h-5 w-5 fill-current" />
          ))}
          <span className="ml-3 text-sm font-black text-[#132236]">
            4.9 Average Rating
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, index) => (
          <article
            key={index}
            className="bg-white border border-[#e7dfd0] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex gap-1 text-[#f4c76b] mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-[17px] leading-relaxed text-[#65758a] italic">
              “{review.text}”
            </p>

            <div className="mt-8 flex items-center gap-4 border-t border-[#e7dfd0] pt-6">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#f4c76b]/20"
              />
              <div>
                <p className="font-black text-[#132236]">{review.name}</p>
                <p className="text-sm text-[#65758a]">{review.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Review;
