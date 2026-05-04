import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "../contexts/UserContext";

export function SignUpModal() {
  const { isProfileSet, saveProfile } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    // Small delay for polish
    await new Promise((r) => setTimeout(r, 400));
    saveProfile(name.trim(), phone.trim(), email.trim());
    toast.success(`Welcome to D'Mora Cafe, ${name.trim().split(" ")[0]}! 🎉`);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {!isProfileSet && (
        <motion.div
          key="signup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10, 8, 6, 0.92)" }}
          data-ocid="signup.dialog"
        >
          {/* Decorative background orbs */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden
          >
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: "oklch(var(--primary) / 0.4)" }}
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
              style={{ background: "oklch(var(--primary) / 0.3)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
          >
            {/* Card */}
            <div
              className="rounded-2xl border border-primary/25 shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, oklch(var(--card)) 0%, oklch(var(--card) / 0.95) 100%)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(var(--primary) / 0.6), oklch(var(--primary)), oklch(var(--primary) / 0.6))",
                }}
              />

              <div className="px-8 pt-8 pb-10">
                {/* Logo / icon area */}
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/30 mb-4"
                    style={{ background: "oklch(var(--primary) / 0.12)" }}
                  >
                    <span className="text-3xl" role="img" aria-label="cafe">
                      ☕
                    </span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-2xl font-bold text-foreground mb-1"
                  >
                    Welcome to D&apos;Mora Cafe
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-muted-foreground text-sm"
                  >
                    Sign up once to start ordering
                  </motion.p>
                </div>

                <motion.form
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="signup.form"
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-foreground/90">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      autoFocus
                      required
                      data-ocid="signup.name_input"
                      className="bg-muted/40 border-border focus:border-primary/60"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="signup-phone"
                      className="text-foreground/90"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      required
                      data-ocid="signup.phone_input"
                      className="bg-muted/40 border-border focus:border-primary/60"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="signup-email"
                      className="text-foreground/90"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="priya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      data-ocid="signup.email_input"
                      className="bg-muted/40 border-border focus:border-primary/60"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gold-glow"
                      disabled={isSubmitting}
                      data-ocid="signup.submit_button"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                          Just a moment…
                        </span>
                      ) : (
                        "Get Started — It's Free"
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground pt-1">
                    Your info is saved only on this device. We never share your
                    data.
                  </p>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
