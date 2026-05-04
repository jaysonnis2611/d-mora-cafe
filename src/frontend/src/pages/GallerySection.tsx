import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface GalleryItem {
  id: string;
  label: string;
  caption: string;
  src: string;
  span?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "cafe-interior",
    label: "Cozy Indoor Seating",
    caption:
      "Warm Edison lighting and plush seating — perfect for relaxed evenings.",
    src: "/assets/generated/cafe-interior-real.dim_1200x800.jpg",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "pasta-arrabbiata",
    label: "Signature Penne Arrabbiata",
    caption: "Our signature spicy tomato penne, a D'Mora fan favourite.",
    src: "/assets/generated/pasta-arrabbiata-real.dim_800x600.jpg",
  },
  {
    id: "pesto-pasta",
    label: "Creamy Pesto Pasta",
    caption:
      "Fresh basil pesto with pine nuts and parmesan — pure Italian comfort.",
    src: "/assets/generated/pesto-pasta-real.dim_800x600.jpg",
  },
  {
    id: "cold-coffee",
    label: "Signature Cold Coffee",
    caption: "Our cold brew blend — smooth, rich, and endlessly refreshing.",
    src: "/assets/generated/cold-coffee-real.dim_800x600.jpg",
  },
  {
    id: "mocha-frappe",
    label: "Mocha Frappe",
    caption: "Layers of chocolate, mocha, and cream — indulgence in a glass.",
    src: "/assets/generated/mocha-frappe-real.dim_800x600.jpg",
  },
  {
    id: "garlic-bread",
    label: "Cheesy Garlic Bread",
    caption:
      "Golden, crispy, loaded with cheese and roasted garlic. A crowd pleaser.",
    src: "/assets/generated/garlic-bread-real.dim_800x600.jpg",
    span: "lg:col-span-2",
  },
  {
    id: "bruschetta",
    label: "Chili Cheese Bruschetta",
    caption:
      "Toasted bread topped with fresh tomato, green chili, and melted mozzarella.",
    src: "/assets/generated/bruschetta-real.dim_800x600.jpg",
  },
  {
    id: "paneer-wrap",
    label: "Grilled Paneer Wrap",
    caption:
      "Smoky paneer with peppers and mint chutney, wrapped to perfection.",
    src: "/assets/generated/paneer-wrap-real.dim_800x600.jpg",
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length,
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length,
    );
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev, closeLightbox]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activeItem =
    lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="min-h-screen py-24 bg-background"
      data-ocid="gallery.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            Photo Gallery
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            A cozy Italian corner in Nashik — warm ambiance, real food, and
            moments worth sharing.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]"
          data-ocid="gallery.list"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-border/30 hover:border-primary/60 transition-all duration-300 ${item.span ?? ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.07 }}
              onClick={() => openLightbox(idx)}
              data-ocid={`gallery.item.${idx + 1}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

              {/* Gold hover border glow */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300 pointer-events-none" />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-bold tracking-wide text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                  {item.caption}
                </p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-9 h-9 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center border border-primary/40">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-label="Expand image"
                    role="img"
                    className="text-primary"
                  >
                    <title>Expand image</title>
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground text-sm">
            Follow us on{" "}
            <span className="text-primary font-semibold">Instagram</span> for
            more photos and daily specials ✨
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && activeItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            data-ocid="gallery.dialog"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-md"
              onClick={closeLightbox}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") closeLightbox();
              }}
              role="button"
              tabIndex={-1}
              aria-label="Close gallery"
            />

            {/* Lightbox card */}
            <motion.div
              className="relative z-10 w-full max-w-3xl mx-4 rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Image area */}
              <div className="relative h-[55vh] bg-card">
                <img
                  src={activeItem.src}
                  alt={activeItem.label}
                  className="w-full h-full object-cover"
                />

                {/* Navigation */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-card/90 transition-all duration-200"
                  aria-label="Previous image"
                  data-ocid="gallery.pagination_prev"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-card/90 transition-all duration-200"
                  aria-label="Next image"
                  data-ocid="gallery.pagination_next"
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/60 backdrop-blur-sm flex items-center justify-center border border-border/50 hover:border-primary/50 hover:bg-card/90 transition-all duration-200"
                  aria-label="Close gallery"
                  data-ocid="gallery.close_button"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>

                {/* Counter */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/60 backdrop-blur-sm border border-border/40">
                  <span className="text-xs font-semibold text-primary">
                    {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                </div>
              </div>

              {/* Label bar */}
              <div className="bg-card px-6 py-5 flex items-start justify-between gap-4 border-t border-primary/10">
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold text-foreground">
                    {activeItem.label}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {activeItem.caption}
                  </p>
                  <p className="text-xs text-primary/70 mt-1 font-medium">
                    D&apos;Mora Cafe &amp; Bistro, Nashik
                  </p>
                </div>
                {/* Dot indicators */}
                <div className="flex gap-1.5 flex-shrink-0 pt-1">
                  {GALLERY_ITEMS.map((_, i) => (
                    <button
                      key={GALLERY_ITEMS[i].id}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        i === lightboxIndex
                          ? "bg-primary w-5"
                          : "bg-border w-2 hover:bg-primary/50"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
