import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

const PLATFORMS = [
  {
    name: "Google",
    rating: 4.4,
    maxRating: 5,
    count: "401 reviews",
    link: "https://maps.google.com/?q=D'Mora+Cafe+Bistro+Nashik",
    linkLabel: "Read on Google",
    logo: (
      <svg
        viewBox="0 0 24 24"
        className="w-10 h-10"
        role="img"
        aria-label="Google logo"
      >
        <title>Google</title>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    accent: "text-blue-400",
    border: "border-blue-500/20 hover:border-blue-400/50",
  },
  {
    name: "Zomato",
    rating: 4.0,
    maxRating: 5,
    count: "Verified restaurant",
    link: "https://www.zomato.com/nashik/d-mora-cafe-bistro",
    linkLabel: "View on Zomato",
    logo: (
      <svg
        viewBox="0 0 60 60"
        className="w-10 h-10"
        role="img"
        aria-label="Zomato logo"
      >
        <title>Zomato</title>
        <circle cx="30" cy="30" r="30" fill="#E23744" />
        <text
          x="30"
          y="38"
          textAnchor="middle"
          fill="white"
          fontWeight="900"
          fontSize="20"
          fontFamily="Arial"
        >
          Z
        </text>
      </svg>
    ),
    accent: "text-red-400",
    border: "border-red-500/20 hover:border-red-400/50",
  },
  {
    name: "Justdial",
    rating: 4.4,
    maxRating: 5,
    count: "403 votes",
    link: "https://www.justdial.com/Nashik/D-Mora-Cafe-Bistro",
    linkLabel: "Read on Justdial",
    logo: (
      <svg
        viewBox="0 0 60 60"
        className="w-10 h-10"
        role="img"
        aria-label="Justdial logo"
      >
        <title>Justdial</title>
        <circle cx="30" cy="30" r="30" fill="#FF6600" />
        <text
          x="30"
          y="38"
          textAnchor="middle"
          fill="white"
          fontWeight="900"
          fontSize="18"
          fontFamily="Arial"
        >
          JD
        </text>
      </svg>
    ),
    accent: "text-orange-400",
    border: "border-orange-500/20 hover:border-orange-400/50",
  },
];

const INDIVIDUAL_REVIEWS = [
  {
    id: "priya-s",
    author: "Priya S.",
    platform: "Google",
    stars: 5,
    text: "Amazing pasta and cold coffee! The ambiance is so cozy and pet-friendly. The upper level seating is perfect for dates. Will definitely come back!",
  },
  {
    id: "rahul-m",
    author: "Rahul M.",
    platform: "Zomato",
    stars: 4,
    text: "Best garlic bread in Nashik! The chili cheese bruschetta is an absolute must-try. Very affordable and absolutely delicious.",
  },
  {
    id: "sneha-k",
    author: "Sneha K.",
    platform: "Google",
    stars: 5,
    text: "Love the Italian vibe and the cozy atmosphere. Great for hangouts and small parties. The pesto pasta is outstanding.",
  },
  {
    id: "amit-d",
    author: "Amit D.",
    platform: "Justdial",
    stars: 4,
    text: "Very cozy cafe. The pasta is fresh and flavourful. Staff is friendly and welcoming. Great value for money — highly recommended!",
  },
  {
    id: "meera-p",
    author: "Meera P.",
    platform: "Google",
    stars: 5,
    text: "Pet-friendly cafe with amazing food. The cold coffee is absolutely to die for! Perfect for Instagram photos too.",
  },
  {
    id: "vikram-r",
    author: "Vikram R.",
    platform: "Justdial",
    stars: 4,
    text: "Tucked away behind Croma but totally worth finding. Great vegetarian options, quick service, and the mocha frappe is incredible!",
  },
];

const PLATFORM_BADGE_CLASS: Record<string, string> = {
  Google: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Zomato: "bg-red-500/10 text-red-400 border-red-500/30",
  Justdial: "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"] as const;

function StarRating({
  rating,
  size = "md",
}: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  return (
    <div
      className={`flex gap-0.5 ${sizeClass}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {STAR_KEYS.map((key, i) => (
        <span
          key={key}
          className={
            i < Math.round(rating) ? "text-primary" : "text-muted-foreground/30"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="min-h-screen py-24 bg-background"
      data-ocid="reviews.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            Guest Experiences
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            Loved across platforms — real words from real guests who've dined at
            D'Mora.
          </p>
        </motion.div>

        {/* Platform Rating Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-20"
          data-ocid="reviews.platforms"
        >
          {PLATFORMS.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              data-ocid={`reviews.platform.${idx + 1}`}
            >
              <Card
                className={`border-2 ${p.border} bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 h-full`}
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                  <div className="mb-1">{p.logo}</div>
                  <div className="font-display text-4xl font-bold text-foreground">
                    {p.rating}
                  </div>
                  <StarRating rating={p.rating} size="lg" />
                  <div className="font-bold text-foreground text-base mt-1">
                    {p.name}
                  </div>
                  <div className="text-muted-foreground text-sm">{p.count}</div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide transition-smooth hover:gap-2.5 ${p.accent}`}
                    data-ocid={`reviews.platform_link.${idx + 1}`}
                  >
                    {p.linkLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
            Guest Reviews
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Individual Review Cards */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="reviews.list"
        >
          {INDIVIDUAL_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              data-ocid={`reviews.item.${idx + 1}`}
            >
              <Card className="h-full bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col gap-3 h-full">
                  {/* Quote mark */}
                  <div
                    className="font-display text-5xl leading-none -mb-2 text-primary/30"
                    aria-hidden="true"
                  >
                    "
                  </div>

                  {/* Review text */}
                  <p className="text-foreground/80 text-sm leading-relaxed flex-1 italic">
                    {review.text}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm text-foreground">
                        {review.author}
                      </span>
                      <StarRating rating={review.stars} size="sm" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs font-bold ${PLATFORM_BADGE_CLASS[review.platform]}`}
                    >
                      {review.platform}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">
            Visited D&apos;Mora?{" "}
            <a
              href="https://maps.google.com/?q=D'Mora+Cafe+Bistro+Nashik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold underline underline-offset-2 transition-smooth hover:text-primary/80"
              data-ocid="reviews.write_review_link"
            >
              Share your experience on Google
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
