import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "/reservations" },
  { label: "Orders", to: "/orders" },
  { label: "Reviews", to: "/reviews" },
  { label: "Gallery", to: "/gallery" },
];

interface HeaderProps {
  onCartOpen: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  const { items } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const cartCount = items.reduce((s, i) => s + i.qty, 0);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-ocid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-smooth"
          data-ocid="header.logo_link"
        >
          D&apos;Mora
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-smooth ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-foreground/70 hover:text-primary"
                }`}
                data-ocid={`header.nav_${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Cart Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="relative gap-2 border-border/60 hover:border-primary/60 hover:text-primary transition-smooth"
          onClick={onCartOpen}
          aria-label={`Open cart, ${cartCount} items`}
          data-ocid="header.cart_button"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Cart</span>
          {cartCount > 0 && (
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
              data-ocid="header.cart_badge"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile Nav */}
      <nav
        className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 flex gap-4 overflow-x-auto no-scrollbar"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => {
          const isActive = currentPath === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium transition-smooth whitespace-nowrap ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-foreground/70 hover:text-primary"
              }`}
              data-ocid={`header.mobile_nav_${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
