import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import OrderSection from "../pages/OrderSection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <>
      {/* Hero banner */}
      <div className="relative pt-16 overflow-hidden">
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <img
            src="/assets/generated/orders-hero-banner.dim_1200x400.jpg"
            alt="D'Mora Cafe food spread"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-2">
                D&apos;Mora Cafe &amp; Bistro
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Order Online
              </h1>
              <div className="flex items-center gap-4 justify-center text-sm text-muted-foreground">
                <Link to="/menu">
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-smooth"
                  >
                    ← Browse Menu
                  </button>
                </Link>
                <span className="w-px h-4 bg-border" />
                <span>🕘 Closes at 9:00 PM</span>
                <span className="w-px h-4 bg-border" />
                <span>🛵 Delivery available</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured dishes strip */}
      <div className="bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {[
              {
                src: "/assets/generated/food-pasta.dim_600x400.jpg",
                label: "Pasta",
                price: "₹199",
              },
              {
                src: "/assets/generated/food-cold-coffee.dim_600x400.jpg",
                label: "Cold Coffee",
                price: "₹129",
              },
              {
                src: "/assets/generated/food-garlic-bread.dim_600x400.jpg",
                label: "Garlic Bread",
                price: "₹99",
              },
              {
                src: "/assets/generated/food-bruschetta.dim_600x400.jpg",
                label: "Bruschetta",
                price: "₹149",
              },
              {
                src: "/assets/generated/food-wrap.dim_600x400.jpg",
                label: "Wraps",
                price: "₹179",
              },
            ].map((dish, idx) => (
              <motion.div
                key={dish.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/60 transition-smooth">
                  <img
                    src={dish.src}
                    alt={dish.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {dish.label}
                </span>
                <span className="text-xs text-primary font-semibold">
                  {dish.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <OrderSection />
      <AppDownloadSection />
      <Footer />
    </>
  );
}
