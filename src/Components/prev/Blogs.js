import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQS = [
  {
    q: "What is the difference between authentication and authorization?",
    sections: [
      {
        heading: "Authentication",
        color: "text-jade",
        points: [
          "The process of verifying the identity of a user or system.",
          "Typically requires credentials like email/password or biometric data.",
          "Happens before authorization in any access flow.",
          "Answers the question: 'Who are you?'",
        ],
      },
      {
        heading: "Authorization",
        color: "text-amber",
        points: [
          "The process of determining what an authenticated user is allowed to do.",
          "Based on roles, permissions, or access levels.",
          "Happens after authentication is successful.",
          "Answers the question: 'What are you allowed to do?'",
        ],
      },
    ],
  },
  {
    q: "Why use Firebase? What other options exist for authentication?",
    content:
      "Firebase Authentication is a comprehensive backend-as-a-service that handles auth securely out of the box. It integrates seamlessly with other Google services, supports real-time data sync, and eliminates the need to build and maintain your own auth infrastructure.",
    list: {
      heading: "Alternative authentication platforms:",
      items: [
        "Auth0",
        "Supabase",
        "Clerk",
        "Stytch",
        "Okta",
        "Keycloak",
        "Cognito (AWS)",
        "Ory",
        "PingIdentity",
        "Frontegg",
      ],
    },
  },
  {
    q: "What other services does Firebase offer beyond authentication?",
    content:
      "Firebase is a full-featured platform that covers much more than authentication:",
    list: {
      heading: "",
      items: [
        "Realtime Database – sync data across clients in real time",
        "Cloud Firestore – scalable NoSQL document database",
        "Cloud Functions – serverless backend logic",
        "Cloud Messaging (FCM) – push notifications",
        "Firebase Hosting – fast CDN-backed static hosting",
        "Cloud Storage – file storage for user-generated content",
        "Remote Config – dynamic app configuration",
        "Analytics – built-in event and user analytics",
      ],
    },
  },
  {
    q: "What is JWT and how does it relate to authentication?",
    content:
      "JSON Web Tokens (JWT) are a compact, self-contained method for securely transmitting information between parties as a JSON object. In modern web auth, a server issues a signed JWT after a user logs in. The client stores this token and sends it with every subsequent request.",
  },
  {
    q: "What is HTTPS and why is it critical for tour booking sites?",
    content:
      "HTTPS encrypts data between the client and server using TLS. For a booking platform, this protects user credentials, personal information, and payment details from attackers.",
  },
];

const POSTS = [
  {
    title: "Best time to trek in Bandarban",
    date: "Oct 2024",
    category: "Travel Tips",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
    excerpt:
      "The dry season from November to March offers the clearest trails and most dramatic views across the hill tracts.",
  },
  {
    title: "What to pack for a 3-day jungle trek",
    date: "Sep 2024",
    category: "Gear Guide",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
    excerpt:
      "Packing light is essential. Here's my curated checklist after 15 years of guiding in Bangladesh's wilderness.",
  },
  {
    title: "Responsible tourism in the CHT",
    date: "Aug 2024",
    category: "Sustainability",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=80",
    excerpt:
      "How to experience the Chittagong Hill Tracts respectfully while supporting local communities.",
  },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-sand">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-semibold text-forest text-sm leading-relaxed group-hover:text-jade transition-colors">
          <span className="text-gold font-cormorant text-lg mr-2">
            {String(index + 1).padStart(2, "0")}.
          </span>

          {faq.q}
        </span>

        <span className="text-jade shrink-0 mt-0.5">
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      {open && (
        <div className="pb-6 space-y-4 animate-fade-in">
          {faq.sections?.map((s) => (
            <div key={s.heading}>
              <h4 className={`font-semibold text-sm mb-2 ${s.color}`}>
                {s.heading}
              </h4>

              <ul className="space-y-1">
                {s.points.map((p, i) => (
                  <li key={i} className="text-smoke text-sm flex gap-2">
                    <span className="text-jade">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {faq.content && (
            <p className="text-smoke text-sm leading-relaxed">{faq.content}</p>
          )}

          {faq.list && (
            <div>
              {faq.list.heading && (
                <p className="text-forest font-semibold text-sm mb-2">
                  {faq.list.heading}
                </p>
              )}

              <ul className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                {faq.list.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-smoke text-sm flex gap-2 items-start"
                  >
                    <span className="text-jade mt-0.5">·</span>

                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Blogs = () => {
  return (
    <main className="pt-[72px] bg-cream min-h-screen">
      {/* HEADER */}
      <div className="bg-forest py-20 px-6 text-center">
        <div className="section-eyebrow justify-center mb-4">
          <span className="eyebrow-text text-gold/80">Knowledge Base</span>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream">
          Blog & FAQ
        </h1>

        <p className="text-cream/60 max-w-lg mx-auto text-sm leading-relaxed mt-4">
          Travel insights, packing tips, and answers to common questions.
        </p>
      </div>

      {/* POSTS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="section-eyebrow mb-3">
          <span className="eyebrow-text">Latest Articles</span>
        </div>

        <h2 className="section-title mb-10">From the field</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {POSTS.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-sand rounded-sm overflow-hidden card-hover group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge">{p.category}</span>

                  <span className="text-xs text-smoke">{p.date}</span>
                </div>

                <h3 className="font-cormorant text-xl font-semibold text-forest mb-2 leading-snug">
                  {p.title}
                </h3>

                <p className="text-smoke text-sm leading-relaxed">
                  {p.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="section-eyebrow mb-3">
          <span className="eyebrow-text">FAQs</span>
        </div>

        <h2 className="section-title mb-8">Common questions</h2>

        <div className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blogs;
