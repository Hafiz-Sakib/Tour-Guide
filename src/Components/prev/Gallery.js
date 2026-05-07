import { useState } from "react";

import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    caption: "Bandarban Summit at Dawn",
    category: "Bandarban",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    caption: "Sunrise Over the Clouds",
    category: "Bandarban",
  },
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    caption: "Kaptai Lake, Rangamati",
    category: "Rangamati",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    caption: "Dense Forest Trail",
    category: "Khagrachari",
  },
  {
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80",
    caption: "Mountain Mist",
    category: "Bandarban",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    caption: "Valley Panorama",
    category: "Rangamati",
  },
  {
    src: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80",
    caption: "Chandranath Hill, Sitakundu",
    category: "Sitakundu",
  },
  {
    src: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
    caption: "Jungle Creek",
    category: "Khagrachari",
  },
  {
    src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80",
    caption: "Ancient Forest Path",
    category: "Bandarban",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    caption: "Emerald Forest Light",
    category: "Khagrachari",
  },
  {
    src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
    caption: "River Through the Hills",
    category: "Rangamati",
  },
  {
    src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    caption: "Hill Tribe Village",
    category: "Bandarban",
  },
];

const CATEGORIES = [
  "All",
  "Bandarban",
  "Rangamati",
  "Khagrachari",
  "Sitakundu",
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");

  const [lightbox, setLightbox] = useState(null);

  const filtered =
    filter === "All" ? IMAGES : IMAGES.filter((i) => i.category === filter);

  const prev = () =>
    setLightbox((l) => (l - 1 + filtered.length) % filtered.length);

  const next = () => setLightbox((l) => (l + 1) % filtered.length);

  return (
    <main className="pt-[72px] bg-cream min-h-screen">
      {/* HEADER */}
      <div className="bg-forest py-20 px-6 text-center">
        <div className="section-eyebrow justify-center mb-4">
          <span className="eyebrow-text text-gold/80">Visual Journey</span>
        </div>

        <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-cream">
          Photo Gallery
        </h1>

        <p className="text-cream/60 max-w-lg mx-auto text-sm leading-relaxed mt-4">
          A glimpse into the landscapes and moments from our guided expeditions.
        </p>
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm border transition-all ${
              filter === cat
                ? "bg-forest text-cream border-forest"
                : "border-sand text-smoke hover:border-forest hover:text-forest"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/50 transition-all duration-300 flex items-end p-4">
                <p className="text-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.caption}
                </p>
              </div>

              <span className="absolute top-3 right-3 badge opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">
                {img.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setLightbox(null);
            }
          }}
        >
          {/* CLOSE */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-cream/70 hover:text-cream text-2xl"
          >
            <FiX />
          </button>

          {/* PREV */}
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 text-cream/70 hover:text-cream text-3xl"
          >
            <FiChevronLeft />
          </button>

          {/* IMAGE */}
          <div className="max-w-4xl w-full">
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].caption}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />

            <div className="text-center mt-4">
              <p className="text-cream font-medium">
                {filtered[lightbox].caption}
              </p>

              <p className="text-cream/40 text-xs mt-1">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* NEXT */}
          <button
            onClick={next}
            className="absolute right-4 md:right-8 text-cream/70 hover:text-cream text-3xl"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
