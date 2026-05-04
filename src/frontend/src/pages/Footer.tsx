import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Tag } from "lucide-react";
import { motion } from "motion/react";
import { SiInstagram, SiZomato } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "/reservations" },
  { label: "Order Online", to: "/orders" },
  { label: "Reviews", to: "/reviews" },
  { label: "Gallery", to: "/gallery" },
];

const SERVICE_PILLS = ["Dine-in", "Takeaway", "Delivery"];

const OFFERS = [
  { icon: "🎉", text: "10% off on pre-bookings" },
  { icon: "🎁", text: "Loyalty cards available" },
  { icon: "📱", text: "Zomato discounts" },
  { icon: "🎂", text: "Party & event bookings welcome" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer id="contact" data-ocid="footer.section">
      {/* Map CTA band */}
      <div className="bg-[#2a1e0c] py-10 border-t border-[#3d2e18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <p className="text-[#f5e6c8] font-display text-lg font-semibold mb-1">
              Find us on the map
            </p>
            <p className="text-[#c4a882] text-sm">
              Shop No. 1, Vizer Apartment, Patil Lane, College Road, Nashik
            </p>
          </motion.div>
          <motion.a
            href="https://maps.google.com/?q=D%27Mora+Cafe+Bistro+Nashik"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c4a882] text-[#f5e6c8] hover:bg-[#c4a882]/20 transition-smooth text-sm font-medium whitespace-nowrap"
            data-ocid="footer.maps_link"
          >
            📍 View on Google Maps
          </motion.a>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="bg-[#1a1208] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-display text-3xl font-bold text-[#f5e6c8] mb-2 tracking-tight">
                D&apos;Mora
              </div>
              <p className="text-[#c4a882] text-sm leading-relaxed mb-4">
                Cozy Italian Vegetarian
                <br />
                Pet Friendly
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {SERVICE_PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-full text-xs border border-[#c4a882]/50 text-[#c4a882]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c4a882] hover:text-[#f5e6c8] transition-smooth text-sm"
                  aria-label="Instagram"
                  data-ocid="footer.instagram_link"
                >
                  <SiInstagram className="w-5 h-5" />
                  <span>@dmoracafe</span>
                </a>
              </div>
            </motion.div>

            {/* Col 2: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-[#f5e6c8] mb-5">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 text-sm text-[#c4a882]">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#d4a96a]" />
                  <p className="leading-relaxed">
                    Shop No. 1, Vizer Apartment,
                    <br />
                    Patil Lane, College Road,
                    <br />
                    Nashik, Maharashtra 422005
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#c4a882]">
                  <Phone className="w-4 h-4 shrink-0 text-[#d4a96a]" />
                  <a
                    href="tel:7447445253"
                    className="hover:text-[#f5e6c8] transition-smooth"
                    data-ocid="footer.phone_link"
                  >
                    7447445253
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#c4a882]">
                  <Clock className="w-4 h-4 shrink-0 text-[#d4a96a]" />
                  <span>Open daily — Closes 9:00 PM</span>
                </div>
              </div>
              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-[#e23744] hover:bg-[#c42f3b] text-white text-sm font-medium transition-smooth"
                data-ocid="footer.book_zomato_button"
              >
                <SiZomato className="w-4 h-4" />
                Book on Zomato
              </a>
            </motion.div>

            {/* Col 3: Special Offers */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display text-lg font-semibold text-[#f5e6c8] mb-5">
                Special Offers
              </h3>
              <div className="space-y-3">
                {OFFERS.map((offer) => (
                  <div
                    key={offer.text}
                    className="flex items-start gap-3 text-sm text-[#c4a882]"
                  >
                    <Tag className="w-4 h-4 mt-0.5 shrink-0 text-[#d4a96a]" />
                    <span>{offer.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-3 rounded-lg border border-[#d4a96a]/30 bg-[#d4a96a]/10">
                <p className="text-xs text-[#d4a96a] font-medium">
                  🌿 100% Vegetarian &nbsp;|&nbsp; 🐾 Pet Friendly
                </p>
              </div>
            </motion.div>

            {/* Col 4: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display text-lg font-semibold text-[#f5e6c8] mb-5">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-left text-sm text-[#c4a882] hover:text-[#f5e6c8] transition-smooth cursor-pointer w-fit"
                    data-ocid={`footer.nav_${link.label.toLowerCase().replace(" ", "_")}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-[#3d2e18]">
                <p className="text-xs text-[#c4a882]/70">
                  Price for two
                  <br />
                  <span className="text-[#d4a96a] font-semibold text-sm">
                    ~₹500
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#110d05] py-5 border-t border-[#2a1e0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#c4a882]/60 text-center sm:text-left">
            &copy; {year} D&apos;Mora Cafe &amp; Bistro. All rights reserved.
          </p>
          <p className="text-xs text-[#c4a882]/50 text-center">
            Price for two ~₹500 &nbsp;|&nbsp; Vegetarian &nbsp;|&nbsp; College
            Road, Nashik
          </p>
          <p className="text-xs text-[#c4a882]/40 text-center sm:text-right">
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c4a882] transition-smooth"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
