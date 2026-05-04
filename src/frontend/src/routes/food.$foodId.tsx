import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, createRoute, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Star,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useCart } from "../contexts/CartContext";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import { MenuCategory } from "../types";
import { Route as rootRoute } from "./__root";

// ---- Types & Data ----
const FOOD_IMAGES: Record<string, string> = {
  "1": "/assets/generated/pasta-arrabbiata-real.dim_800x600.jpg",
  "2": "/assets/generated/pesto-pasta-real.dim_800x600.jpg",
  "3": "/assets/generated/rose-pasta-real.dim_800x600.jpg",
  "4": "/assets/generated/cold-coffee-real.dim_800x600.jpg",
  "5": "/assets/generated/mocha-frappe-real.dim_800x600.jpg",
  "6": "/assets/generated/vanilla-cold-brew-real.dim_800x600.jpg",
  "7": "/assets/generated/garlic-bread-real.dim_800x600.jpg",
  "8": "/assets/generated/classic-garlic-bread-real.dim_800x600.jpg",
  "9": "/assets/generated/bruschetta-real.dim_800x600.jpg",
  "10": "/assets/generated/tomato-bruschetta-real.dim_800x600.jpg",
  "11": "/assets/generated/paneer-wrap-real.dim_800x600.jpg",
  "12": "/assets/generated/falafel-wrap-real.dim_800x600.jpg",
};

const MENU_ITEMS = [
  {
    id: 1n,
    name: "Penne Arrabbiata",
    description:
      "Penne in spicy tomato arrabbiata sauce with fresh herbs and parmesan. Made with premium imported pasta, vine-ripened tomatoes, and a generous hand of Italian herbs.",
    price: 180n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 2n,
    name: "Pesto Pasta",
    description:
      "Basil pesto, cherry tomatoes, toasted pine nuts and parmesan. Our house-made pesto is blended fresh daily with Genovese basil.",
    price: 220n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 3n,
    name: "Rose Pasta",
    description:
      "Creamy tomato rose sauce with fresh herbs and light cream. The perfect balance of tomato tang and cream richness, finished with freshly ground pepper.",
    price: 230n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 4n,
    name: "Classic Cold Coffee",
    description:
      "Creamy blended coffee with chilled milk and a frothy milk foam top. Made with freshly brewed espresso and blended with premium cold milk.",
    price: 120n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 5n,
    name: "Mocha Frappe",
    description:
      "Espresso, chocolate syrup, blended ice and whipped cream. A indulgent treat with rich Belgian chocolate and bold espresso.",
    price: 140n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 6n,
    name: "Vanilla Cold Brew",
    description:
      "Slow-steeped cold brew coffee with vanilla and oat milk. Cold brewed for 18 hours for a smooth, low-acid coffee experience.",
    price: 130n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 7n,
    name: "Cheesy Garlic Bread",
    description:
      "Toasted baguette with herb butter, melted cheese and marinara dip. Our signature garlic butter recipe with a blend of three cheeses.",
    price: 100n,
    category: MenuCategory.GarlicBread,
    available: true,
    vegetarian: true,
  },
  {
    id: 8n,
    name: "Classic Garlic Bread",
    description:
      "Crispy toasted bread with roasted garlic herb butter. Simple and perfect — freshly baked bread with house-roasted garlic and herbs.",
    price: 80n,
    category: MenuCategory.GarlicBread,
    available: true,
    vegetarian: true,
  },
  {
    id: 9n,
    name: "Chili Cheese Bruschetta",
    description:
      "Toasted baguette with green chili, melted cheese and fresh basil. Our most popular starter with a spicy kick and oozy cheese.",
    price: 150n,
    category: MenuCategory.Bruschetta,
    available: true,
    vegetarian: true,
  },
  {
    id: 10n,
    name: "Classic Tomato Bruschetta",
    description:
      "Toasted sourdough with fresh tomato, garlic, olive oil and basil. The Italian classic, made with heirloom tomatoes and extra virgin olive oil.",
    price: 130n,
    category: MenuCategory.Bruschetta,
    available: true,
    vegetarian: true,
  },
  {
    id: 11n,
    name: "Paneer Wrap",
    description:
      "Tandoori spiced paneer, mint chutney, crisp veggies in a soft tortilla. House-marinated paneer grilled to perfection with a cooling mint chutney.",
    price: 160n,
    category: MenuCategory.Wraps,
    available: true,
    vegetarian: true,
  },
  {
    id: 12n,
    name: "Falafel Wrap",
    description:
      "Crispy falafel, hummus, pickled vegetables and tahini sauce. Middle Eastern inspired wrap with house-made falafel and creamy tahini.",
    price: 155n,
    category: MenuCategory.Wraps,
    available: true,
    vegetarian: true,
  },
];

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  [MenuCategory.Pasta]: "Pasta",
  [MenuCategory.ColdCoffee]: "Cold Coffee",
  [MenuCategory.GarlicBread]: "Garlic Bread",
  [MenuCategory.Bruschetta]: "Bruschetta",
  [MenuCategory.Wraps]: "Wraps",
  [MenuCategory.Other]: "Other",
};

const CATEGORY_EMOJI: Record<MenuCategory, string> = {
  [MenuCategory.Pasta]: "🍝",
  [MenuCategory.ColdCoffee]: "☕",
  [MenuCategory.GarlicBread]: "🥖",
  [MenuCategory.Bruschetta]: "🫓",
  [MenuCategory.Wraps]: "🌯",
  [MenuCategory.Other]: "🍽️",
};

const ITEM_REVIEWS: Record<
  string,
  Array<{
    name: string;
    rating: number;
    text: string;
    date: string;
    avatar: string;
  }>
> = {
  "1": [
    {
      name: "Priya S.",
      rating: 5,
      text: "The Penne Arrabbiata is fiery and so flavourful! Perfect spice level and the pasta was cooked al dente. One of the best I've had in Nashik.",
      date: "Mar 2025",
      avatar: "👩",
    },
    {
      name: "Rahul M.",
      rating: 4,
      text: "Loved the fresh herbs on top. Great portion size for the price. Reminded me of authentic Italian.",
      date: "Feb 2025",
      avatar: "👨",
    },
    {
      name: "Sneha K.",
      rating: 5,
      text: "Came here with my boyfriend and we both ordered this. The marinara base is incredibly fresh. Will definitely be back!",
      date: "Jan 2025",
      avatar: "🧕",
    },
    {
      name: "Vikram D.",
      rating: 4,
      text: "Solid arrabbiata. The tomato sauce had real depth of flavour. Went well with their garlic bread on the side.",
      date: "Dec 2024",
      avatar: "🧑",
    },
  ],
  "2": [
    {
      name: "Ananya R.",
      rating: 5,
      text: "Fresh basil pesto that doesn't taste jarred at all! The pine nuts add a beautiful crunch. Highly recommend.",
      date: "Mar 2025",
      avatar: "👩",
    },
    {
      name: "Karan B.",
      rating: 5,
      text: "Best pesto pasta I've had outside of a 5-star hotel. The cherry tomatoes burst with sweetness.",
      date: "Feb 2025",
      avatar: "👨",
    },
    {
      name: "Meera T.",
      rating: 4,
      text: "Great flavour balance between the pesto and parmesan. A bit pricey but worth every bite.",
      date: "Jan 2025",
      avatar: "🧕",
    },
    {
      name: "Arjun N.",
      rating: 5,
      text: "Ordered this three times already. They haven't changed the recipe and that's exactly how it should be.",
      date: "Dec 2024",
      avatar: "🧑",
    },
  ],
};

function getReviewsForItem(itemId: string) {
  if (ITEM_REVIEWS[itemId]) return ITEM_REVIEWS[itemId];
  // Fallback generic reviews
  return [
    {
      name: "Priya S.",
      rating: 5,
      text: "Absolutely delicious! The flavours are authentic and the portion is generous. A must-try at D'Mora.",
      date: "Mar 2025",
      avatar: "👩",
    },
    {
      name: "Rahul M.",
      rating: 4,
      text: "Really enjoyed this dish. Fresh ingredients and great presentation. Will order again.",
      date: "Feb 2025",
      avatar: "👨",
    },
    {
      name: "Sneha K.",
      rating: 5,
      text: "My favourite item on the menu! The quality is consistently great every time I visit.",
      date: "Jan 2025",
      avatar: "🧕",
    },
    {
      name: "Vikram D.",
      rating: 4,
      text: "Good flavour, good price, good vibes. D'Mora never disappoints!",
      date: "Dec 2024",
      avatar: "🧑",
    },
  ];
}

// ---- Route ----
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/food/$foodId",
  component: FoodDetailPage,
});

function FoodDetailPage() {
  const { foodId } = useParams({ from: "/food/$foodId" });
  const { addToCart, updateQty, items } = useCart();
  const [localQty, setLocalQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const item = MENU_ITEMS.find((m) => m.id.toString() === foodId);
  const reviews = getReviewsForItem(foodId);
  const cartItem = items.find((i) => i.id === item?.id);
  const cartQty = cartItem?.qty ?? 0;
  const cartTotal = items.reduce((s, i) => s + i.price * BigInt(i.qty), 0n);
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  const handleAdd = useCallback(() => {
    if (!item) return;
    for (let i = 0; i < localQty; i++) {
      addToCart({ id: item.id, name: item.name, price: item.price });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [item, localQty, addToCart]);

  const handleCartRemove = useCallback(() => {
    if (!item) return;
    updateQty(item.id, Math.max(0, cartQty - 1));
  }, [item, cartQty, updateQty]);

  const handleCartAdd = useCallback(() => {
    if (!item) return;
    addToCart({ id: item.id, name: item.name, price: item.price });
  }, [item, addToCart]);

  if (!item) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-7xl mb-2">🍽️</div>
        <h2 className="font-display text-3xl font-bold text-foreground">
          Item not found
        </h2>
        <p className="text-muted-foreground">
          This dish doesn't seem to be on the menu.
        </p>
        <Link to="/menu">
          <Button variant="outline" className="mt-2 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Button>
        </Link>
      </div>
    );
  }

  const imgSrc =
    FOOD_IMAGES[foodId] ?? "/assets/generated/rose-pasta-real.dim_800x600.jpg";
  const hasOffer = [1n, 4n, 7n].includes(item.id);

  return (
    <>
      <div className="pt-16 min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link to="/menu" data-ocid="food-detail.back_button">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Menu
              </button>
            </Link>
          </motion.div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            {/* Food image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              data-ocid="food-detail.image"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-background/50 border border-border/40">
                <img
                  src={imgSrc}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent" />
              </div>
              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-1 bg-accent/90 text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Leaf className="w-3 h-3" />
                  100% Vegetarian
                </div>
                {hasOffer && (
                  <div className="flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Tag className="w-3 h-3" />
                    10% off today
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info & Order */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col"
              data-ocid="food-detail.panel"
            >
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs capitalize">
                  {CATEGORY_EMOJI[item.category]}{" "}
                  {CATEGORY_LABELS[item.category]}
                </Badge>
                {!item.available && (
                  <Badge variant="destructive" className="text-xs">
                    Unavailable
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
                {item.name}
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-shrink-0">
                {item.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display font-bold text-4xl text-primary">
                  ₹{item.price.toString()}
                </span>
                {hasOffer && (
                  <span className="text-muted-foreground text-sm line-through">
                    ₹{(Number(item.price) * 1.1).toFixed(0)}
                  </span>
                )}
                <span className="text-muted-foreground text-sm">
                  per serving
                </span>
              </div>

              {/* Qty selector + Add to Cart */}
              <div
                className="flex items-center gap-4 mb-4"
                data-ocid="food-detail.qty_section"
              >
                <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setLocalQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                    disabled={localQty <= 1}
                    aria-label="Decrease quantity"
                    data-ocid="food-detail.qty_decrease_button"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span
                    className="font-semibold text-foreground w-6 text-center tabular-nums"
                    data-ocid="food-detail.qty_value"
                  >
                    {localQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocalQty((q) => q + 1)}
                    className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth"
                    aria-label="Increase quantity"
                    data-ocid="food-detail.qty_increase_button"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  onClick={handleAdd}
                  disabled={!item.available}
                  className="flex-1 gap-2 h-11 transition-smooth"
                  data-ocid="food-detail.add_to_cart_button"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        ✓ Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>

              {/* Order Now */}
              <Link to="/orders">
                <Button
                  variant="outline"
                  className="w-full gap-2 h-11 border-primary/40 hover:border-primary hover:bg-primary/5 transition-smooth"
                  data-ocid="food-detail.order_now_button"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now — Checkout
                </Button>
              </Link>

              {/* Divider */}
              <div className="my-6 h-px bg-border/50" />

              {/* Cart Summary */}
              <CartSummary
                cartQty={cartQty}
                cartCount={cartCount}
                cartTotal={cartTotal}
                item={item}
                onAdd={handleCartAdd}
                onRemove={handleCartRemove}
              />
            </motion.div>
          </div>

          {/* Reviews */}
          <FoodReviews reviews={reviews} itemName={item.name} />
        </div>
      </div>

      <AppDownloadSection />
      <Footer />
    </>
  );
}

// ---- CartSummary ----
interface CartSummaryProps {
  cartQty: number;
  cartCount: number;
  cartTotal: bigint;
  item: (typeof MENU_ITEMS)[0];
  onAdd: () => void;
  onRemove: () => void;
}

function CartSummary({
  cartQty,
  cartCount,
  cartTotal,
  item,
  onAdd,
  onRemove,
}: CartSummaryProps) {
  if (cartCount === 0) {
    return (
      <div
        className="rounded-xl border border-border/50 bg-muted/20 p-4 text-center"
        data-ocid="food-detail.cart_summary"
      >
        <ShoppingCart className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Your cart is empty</p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">
          Add items above to start your order
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-xl border border-primary/20 bg-primary/5 p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="food-detail.cart_summary"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          Cart Summary
        </span>
        <Badge variant="secondary" className="text-xs">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </Badge>
      </div>

      {cartQty > 0 && (
        <div className="flex items-center justify-between mb-3 py-2 border-b border-border/40">
          <span className="text-sm text-muted-foreground truncate min-w-0 flex-1 mr-2">
            {item.name}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRemove}
              className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-smooth text-foreground"
              aria-label="Remove one"
              data-ocid="food-detail.cart_remove_button"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-semibold w-4 text-center tabular-nums">
              {cartQty}
            </span>
            <button
              type="button"
              onClick={onAdd}
              className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth"
              aria-label="Add one more"
              data-ocid="food-detail.cart_add_button"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-display font-bold text-lg text-primary">
          ₹{cartTotal.toString()}
        </span>
      </div>

      <Link to="/orders">
        <Button
          size="sm"
          className="w-full gap-2 transition-smooth"
          data-ocid="food-detail.checkout_button"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Proceed to Checkout
        </Button>
      </Link>
    </motion.div>
  );
}

// ---- FoodReviews ----
interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

function FoodReviews({
  reviews,
  itemName,
}: { reviews: Review[]; itemName: string }) {
  const avgRating = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-ocid="food-detail.reviews_section"
    >
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Reviews for {itemName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-primary text-lg">{avgRating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review, idx) => (
          <motion.div
            key={`${review.name}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            data-ocid={`food-detail.review.${idx + 1}`}
          >
            <Card className="border-border/50 hover:border-primary/20 transition-smooth h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xl">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground leading-none">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
