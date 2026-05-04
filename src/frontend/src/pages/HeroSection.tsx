import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const badges = [
  { label: "🌿 Vegetarian", key: "veg" },
  { label: "4.4★ Google", key: "google" },
  { label: "🐾 Pet Friendly", key: "pet" },
  { label: "📍 Nashik College Road", key: "location" },
];

const offers = [
  "10% off on pre-bookings",
  "Loyalty cards available",
  "Zomato discounts",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offerIndex, setOfferIndex] = useState(0);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const t = setInterval(() => {
      setOfferIndex((i) => (i + 1) % offers.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 60% 30%, oklch(0.72 0.14 35) 0%, oklch(0.62 0.18 28) 35%, oklch(0.48 0.15 25) 65%, oklch(0.3 0.08 30) 100%)",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 75% 20%, oklch(0.96 0.04 75) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 110%, oklch(0.48 0.12 135) 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ background: "oklch(0.78 0.16 40)" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full opacity-15"
          animate={{ scale: [1, 1.12, 1], rotate: [0, -10, 0] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{ background: "oklch(0.58 0.1 135)" }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.96 0.01 70) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-12 w-full flex flex-col items-center text-center"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-6"
        >
          <span
            className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase border"
            style={{
              background: "oklch(0.98 0.03 75 / 0.18)",
              borderColor: "oklch(0.98 0.03 75 / 0.35)",
              color: "oklch(0.96 0.02 70)",
              backdropFilter: "blur(6px)",
            }}
          >
            🌿 100% Vegetarian — Cozy &amp; Pet Friendly
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <span style={{ color: "oklch(0.97 0.04 72)" }}>D&apos;Mora</span>
          <br />
          <span className="italic" style={{ color: "oklch(0.88 0.12 55)" }}>
            Cafe &amp; Bistro
          </span>
        </motion.h1>

        <motion.p
          className="font-display text-xl sm:text-2xl italic mb-4"
          style={{ color: "oklch(0.92 0.05 72 / 0.9)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Cozy Italian Vegetarian — Pet Friendly
        </motion.p>

        <motion.p
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          style={{ color: "oklch(0.9 0.03 68 / 0.78)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Authentic pasta, cold coffee &amp; garlic bread crafted with love on
          College Road, Nashik. Dine-in · Takeaway · Delivery.
        </motion.p>

        {/* CTA Buttons — router navigation */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <Button
            type="button"
            size="lg"
            className="font-semibold px-8 py-3 text-base shadow-xl rounded-full transition-smooth"
            style={{
              background: "oklch(0.62 0.18 28)",
              color: "oklch(0.98 0.02 70)",
              border: "none",
            }}
            onClick={() => navigate({ to: "/reservations" })}
            data-ocid="hero.reserve_button"
          >
            Reserve a Table
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="font-semibold px-8 py-3 text-base rounded-full transition-smooth"
            style={{
              background: "oklch(0.96 0.03 70 / 0.12)",
              borderColor: "oklch(0.96 0.03 70 / 0.5)",
              color: "oklch(0.97 0.02 70)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => navigate({ to: "/menu" })}
            data-ocid="hero.order_button"
          >
            Explore Menu
          </Button>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          {badges.map((badge, i) => (
            <motion.span
              key={badge.key}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-sm font-medium px-4 py-1.5 rounded-full border cursor-default"
              style={{
                background: "oklch(0.98 0.04 70 / 0.14)",
                borderColor: "oklch(0.98 0.04 70 / 0.28)",
                color: "oklch(0.96 0.03 70)",
                backdropFilter: "blur(4px)",
              }}
            >
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Offer Banner */}
        <motion.div
          className="relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl border overflow-hidden"
          style={{
            background: "oklch(0.96 0.04 70 / 0.1)",
            borderColor: "oklch(0.88 0.12 55 / 0.45)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          data-ocid="hero.offer_banner"
        >
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{
              background: "oklch(0.88 0.12 55)",
              color: "oklch(0.98 0.02 70)",
            }}
          >
            OFFER
          </span>
          <div className="relative overflow-hidden h-5 flex items-center min-w-[220px]">
            {offers.map((offer, i) => (
              <motion.span
                key={offer}
                className="absolute whitespace-nowrap text-sm font-medium"
                style={{ color: "oklch(0.96 0.03 70)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: i === offerIndex ? 1 : 0,
                  y: i === offerIndex ? 0 : -16,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {offer}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Rating row */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {[
            { platform: "Google", rating: "4.4★", sub: "401 reviews" },
            { platform: "Justdial", rating: "4.4★", sub: "403 votes" },
            { platform: "Zomato", rating: "4/5", sub: "Verified" },
          ].map((r) => (
            <div
              key={r.platform}
              className="flex flex-col items-center px-4 py-2 rounded-lg border"
              style={{
                background: "oklch(0.98 0.03 70 / 0.1)",
                borderColor: "oklch(0.98 0.03 70 / 0.22)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="text-base font-bold font-display"
                style={{ color: "oklch(0.97 0.06 72)" }}
              >
                {r.rating}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: "oklch(0.92 0.04 70)" }}
              >
                {r.platform}
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(0.85 0.02 68 / 0.75)" }}
              >
                {r.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span
          className="text-xs tracking-widest uppercase font-medium"
          style={{ color: "oklch(0.92 0.03 70 / 0.7)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.6,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1"
            style={{ borderColor: "oklch(0.9 0.03 70 / 0.45)" }}
          >
            <div
              className="w-1.5 h-3 rounded-full"
              style={{ background: "oklch(0.9 0.03 70 / 0.65)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
