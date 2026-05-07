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
  <section className="bg-[#f6f2ea] py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Traveler Stories</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#132236] md:text-5xl">
            Trusted by guests who value thoughtful planning.
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#f4c76b]">
          {[1, 2, 3, 4, 5].map((item) => (
            <FiStar key={item} className="fill-current" />
          ))}
          <span className="ml-2 text-sm font-black text-[#132236]">4.9 average rating</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="border border-[#e7dfd0] bg-white p-7 shadow-sm">
            <div className="mb-6 flex gap-1 text-[#f4c76b]">
              {[1, 2, 3, 4, 5].map((item) => (
                <FiStar key={item} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-7 text-[#65758a]">"{review.text}"</p>
            <div className="mt-7 flex items-center gap-3 border-t border-[#e7dfd0] pt-5">
              <img src={review.avatar} alt={review.name} className="h-12 w-12 object-cover" />
              <div>
                <p className="font-black text-[#132236]">{review.name}</p>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#65758a]">{review.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Review;
