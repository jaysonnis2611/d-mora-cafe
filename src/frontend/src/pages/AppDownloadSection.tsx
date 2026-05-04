import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { motion } from "motion/react";

export default function AppDownloadSection() {
  return (
    <section
      className="relative py-20 overflow-hidden bg-card border-t border-border/50"
      data-ocid="app-download.section"
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 110%, oklch(0.68 0.18 80 / 0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Phone mockup */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-44 h-80 sm:w-52 sm:h-96">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[2.5rem] border-4 border-primary/40 bg-gradient-to-b from-card to-muted shadow-2xl shadow-primary/10 overflow-hidden">
                {/* Status bar */}
                <div className="h-8 bg-background/80 flex items-center justify-center">
                  <div className="w-16 h-3 rounded-full bg-border/60" />
                </div>
                {/* App screen content */}
                <div className="px-3 py-2 space-y-2">
                  <div className="rounded-xl overflow-hidden h-28 bg-muted/40">
                    <img
                      src="/assets/generated/rose-pasta-real.dim_800x600.jpg"
                      alt="App preview"
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                  <div className="space-y-1.5 px-1">
                    <div className="h-2.5 w-3/4 rounded-full bg-primary/30" />
                    <div className="h-2 w-1/2 rounded-full bg-muted-foreground/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 px-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-12 rounded-lg bg-muted/50 border border-border/40"
                      />
                    ))}
                  </div>
                  <div className="px-1">
                    <div className="h-8 rounded-full bg-primary/25 border border-primary/40" />
                  </div>
                </div>
              </div>
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-[3rem] bg-primary/5 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Text + buttons */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-widest uppercase mb-4 bg-primary/10 px-3 py-1.5 rounded-full">
              <Smartphone className="w-3.5 h-3.5" />
              Now Available
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4">
              D&apos;Mora in <span className="text-primary">Your Pocket</span>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Order your favorites, book a table, and stay updated with
              exclusive offers — all from the app. Skip the queue, earn rewards,
              and enjoy D&apos;Mora wherever you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* App Store */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="h-14 px-6 gap-3 border-primary/40 hover:border-primary/80 hover:bg-primary/5 transition-smooth group min-w-[180px]"
                  data-ocid="app-download.app-store_button"
                  aria-label="Download on the App Store"
                >
                  <AppleIcon className="w-6 h-6 text-foreground group-hover:text-primary transition-smooth" />
                  <div className="text-left">
                    <div className="text-[10px] text-muted-foreground leading-none mb-0.5">
                      Download on the
                    </div>
                    <div className="text-sm font-semibold text-foreground font-display leading-none">
                      App Store
                    </div>
                  </div>
                </Button>
              </motion.div>

              {/* Google Play */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="h-14 px-6 gap-3 border-primary/40 hover:border-primary/80 hover:bg-primary/5 transition-smooth group min-w-[180px]"
                  data-ocid="app-download.google-play_button"
                  aria-label="Get it on Google Play"
                >
                  <PlayStoreIcon className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] text-muted-foreground leading-none mb-0.5">
                      Get it on
                    </div>
                    <div className="text-sm font-semibold text-foreground font-display leading-none">
                      Google Play
                    </div>
                  </div>
                </Button>
              </motion.div>
            </div>

            {/* Social proof */}
            <motion.div
              className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[
                  { emoji: "🧑", label: "customer-1" },
                  { emoji: "👩", label: "customer-2" },
                  { emoji: "👨", label: "customer-3" },
                  { emoji: "🧕", label: "customer-4" },
                ].map(({ emoji, label }) => (
                  <div
                    key={label}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-base"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-primary text-xs">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Loved by 400+ customers
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.18 23.5c.38.21.8.23 1.19.04l11.44-6.53-2.57-2.57L3.18 23.5z"
        fill="#EA4335"
      />
      <path
        d="M20.82 10.51L18.5 9.18l-2.88 2.88 2.88 2.88 2.35-1.34A1.65 1.65 0 0 0 20.82 10.51z"
        fill="#FBBC04"
      />
      <path
        d="M3.18.5a1.64 1.64 0 0 0-.18.76v21.48c0 .27.06.52.18.76l.09.08 12.03-12.03v-.09L3.27.42l-.09.08z"
        fill="#4285F4"
      />
      <path
        d="M15.3 15.61l-2.76-2.76v-.09l-.01-.09 2.77-2.77.06.04 3.14 1.79A1.65 1.65 0 0 1 18.5 14.8l-3.14 1.79-.06.02z"
        fill="#34A853"
      />
    </svg>
  );
}
