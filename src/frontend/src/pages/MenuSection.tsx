import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { Check, Leaf, Search, ShoppingCart, Tag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useMenuItems } from "../hooks/use-backend";
import { MenuCategory } from "../types";

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  [MenuCategory.Pasta]: "Pasta",
  [MenuCategory.ColdCoffee]: "Cold Coffee",
  [MenuCategory.GarlicBread]: "Garlic Bread",
  [MenuCategory.Bruschetta]: "Bruschetta",
  [MenuCategory.Wraps]: "Wraps",
  [MenuCategory.Other]: "Other",
};

const CATEGORY_ORDER = [
  MenuCategory.Pasta,
  MenuCategory.ColdCoffee,
  MenuCategory.GarlicBread,
  MenuCategory.Bruschetta,
  MenuCategory.Wraps,
  MenuCategory.Other,
];

const CATEGORY_EMOJI: Record<MenuCategory, string> = {
  [MenuCategory.Pasta]: "🍝",
  [MenuCategory.ColdCoffee]: "☕",
  [MenuCategory.GarlicBread]: "🥖",
  [MenuCategory.Bruschetta]: "🫓",
  [MenuCategory.Wraps]: "🌯",
  [MenuCategory.Other]: "🍽️",
};

// Real food images per item id — each item has its own unique photo
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

const CATEGORY_IMAGES: Record<MenuCategory, string> = {
  [MenuCategory.Pasta]: "/assets/generated/pesto-pasta-real.dim_800x600.jpg",
  [MenuCategory.ColdCoffee]:
    "/assets/generated/mocha-frappe-real.dim_800x600.jpg",
  [MenuCategory.GarlicBread]:
    "/assets/generated/garlic-bread-real.dim_800x600.jpg",
  [MenuCategory.Bruschetta]:
    "/assets/generated/bruschetta-real.dim_800x600.jpg",
  [MenuCategory.Wraps]: "/assets/generated/paneer-wrap-real.dim_800x600.jpg",
  [MenuCategory.Other]: "/assets/generated/rose-pasta-real.dim_800x600.jpg",
};

const OFFER_IDS = new Set([1n, 4n, 7n]);

const FALLBACK_ITEMS = [
  {
    id: 1n,
    name: "Penne Arrabbiata",
    description:
      "Penne in spicy tomato arrabbiata sauce with fresh herbs and parmesan",
    price: 180n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 2n,
    name: "Pesto Pasta",
    description: "Basil pesto, cherry tomatoes, toasted pine nuts and parmesan",
    price: 220n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 3n,
    name: "Rose Pasta",
    description: "Creamy tomato rose sauce with fresh herbs and light cream",
    price: 230n,
    category: MenuCategory.Pasta,
    available: true,
    vegetarian: true,
  },
  {
    id: 4n,
    name: "Classic Cold Coffee",
    description:
      "Creamy blended coffee with chilled milk and a frothy milk foam top",
    price: 120n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 5n,
    name: "Mocha Frappe",
    description: "Espresso, chocolate syrup, blended ice and whipped cream",
    price: 140n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 6n,
    name: "Vanilla Cold Brew",
    description: "Slow-steeped cold brew coffee with vanilla and oat milk",
    price: 130n,
    category: MenuCategory.ColdCoffee,
    available: true,
    vegetarian: true,
  },
  {
    id: 7n,
    name: "Cheesy Garlic Bread",
    description:
      "Toasted baguette with herb butter, melted cheese and marinara dip",
    price: 100n,
    category: MenuCategory.GarlicBread,
    available: true,
    vegetarian: true,
  },
  {
    id: 8n,
    name: "Classic Garlic Bread",
    description: "Crispy toasted bread with roasted garlic herb butter",
    price: 80n,
    category: MenuCategory.GarlicBread,
    available: true,
    vegetarian: true,
  },
  {
    id: 9n,
    name: "Chili Cheese Bruschetta",
    description:
      "Toasted baguette with green chili, melted cheese and fresh basil",
    price: 150n,
    category: MenuCategory.Bruschetta,
    available: true,
    vegetarian: true,
  },
  {
    id: 10n,
    name: "Classic Tomato Bruschetta",
    description:
      "Toasted sourdough with fresh tomato, garlic, olive oil and basil",
    price: 130n,
    category: MenuCategory.Bruschetta,
    available: true,
    vegetarian: true,
  },
  {
    id: 11n,
    name: "Paneer Wrap",
    description:
      "Tandoori spiced paneer, mint chutney, crisp veggies in a soft tortilla",
    price: 160n,
    category: MenuCategory.Wraps,
    available: true,
    vegetarian: true,
  },
  {
    id: 12n,
    name: "Falafel Wrap",
    description: "Crispy falafel, hummus, pickled vegetables and tahini sauce",
    price: 155n,
    category: MenuCategory.Wraps,
    available: true,
    vegetarian: true,
  },
];

function getItemImage(item: (typeof FALLBACK_ITEMS)[0]): string {
  return FOOD_IMAGES[item.id.toString()] ?? CATEGORY_IMAGES[item.category];
}

function MenuCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

interface MenuCardProps {
  item: (typeof FALLBACK_ITEMS)[0];
  index: number;
  qty: number;
  onAdd: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
  justAdded: boolean;
  onCardClick: () => void;
}

function MenuCard({
  item,
  index,
  qty,
  onAdd,
  onRemove,
  justAdded,
  onCardClick,
}: MenuCardProps) {
  const hasOffer = OFFER_IDS.has(item.id);
  const imgSrc = getItemImage(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`menu.item.${index + 1}`}
    >
      <Card
        className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-smooth group border-border/60 cursor-pointer"
        onClick={onCardClick}
        aria-label={`View details for ${item.name}`}
      >
        {/* Real food image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imgSrc}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          {/* VEG badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            <Leaf className="w-3 h-3" />
            VEG
          </div>
          {/* Offer badge */}
          {hasOffer && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
              <Tag className="w-3 h-3" />
              10% off
            </div>
          )}
        </div>

        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display font-semibold text-foreground leading-tight flex-1 min-w-0">
              {item.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs capitalize">
              {CATEGORY_EMOJI[item.category]}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between mt-auto gap-3">
            <span className="font-display font-bold text-xl text-primary">
              ₹{item.price.toString()}
            </span>

            {qty > 0 ? (
              <div className="flex items-center gap-2 rounded-full border border-border px-1 py-0.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(e);
                  }}
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-base leading-none text-foreground hover:bg-muted transition-smooth"
                  aria-label="Remove one"
                  data-ocid={`menu.remove_button.${index + 1}`}
                >
                  −
                </button>
                <span className="font-semibold text-sm w-5 text-center tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(e);
                  }}
                  className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base leading-none hover:bg-primary/90 transition-smooth"
                  aria-label="Add one more"
                  data-ocid={`menu.add_button.${index + 1}`}
                >
                  +
                </button>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                disabled={!item.available}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(e);
                }}
                className="shrink-0 transition-smooth gap-1.5"
                data-ocid={`menu.add_to_cart_button.${index + 1}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {justAdded ? (
                    <motion.span
                      key="added"
                      className="flex items-center gap-1.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3.5 h-3.5" />
                      Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      className="flex items-center gap-1.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {item.available ? "Add to Cart" : "Unavailable"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

type CategoryFilter = MenuCategory | "All";

export default function MenuSection() {
  const { data: backendItems, isLoading } = useMenuItems();
  const { addToCart, updateQty, items } = useCart();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [justAddedIds, setJustAddedIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const menuItems =
    backendItems && backendItems.length > 0 ? backendItems : FALLBACK_ITEMS;

  const filtered = menuItems.filter((item) => {
    const matchCat =
      activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getQtyInCart = useCallback(
    (id: bigint) => items.find((i) => i.id === id)?.qty ?? 0,
    [items],
  );

  const handleAdd = useCallback(
    (item: (typeof FALLBACK_ITEMS)[0]) => {
      if (!item.available) return;
      addToCart({ id: item.id, name: item.name, price: item.price });
      const key = item.id.toString();
      setJustAddedIds((prev) => new Set(prev).add(key));
      setTimeout(() => {
        setJustAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 1500);
    },
    [addToCart],
  );

  const handleRemove = useCallback(
    (id: bigint) => {
      const current = items.find((i) => i.id === id);
      if (current) updateQty(id, current.qty - 1);
    },
    [items, updateQty],
  );

  return (
    <section id="menu" className="py-24 bg-muted/20" data-ocid="menu.section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-accent font-semibold text-xs tracking-widest uppercase mb-3 bg-accent/10 px-3 py-1.5 rounded-full">
            <Leaf className="w-3.5 h-3.5" />
            100% Vegetarian
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-1 mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Fresh ingredients, bold Italian flavors — every dish crafted with
            love.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-md mx-auto mb-8 relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border/70 focus:border-primary/60"
            data-ocid="menu.search_input"
          />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap sm:justify-center"
            data-ocid="menu.category_filter"
          >
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-smooth cursor-pointer border ${
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-foreground/70 hover:border-primary/50 hover:text-foreground"
              }`}
              data-ocid="menu.filter.all"
            >
              All
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-smooth cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border text-foreground/70 hover:border-primary/50 hover:text-foreground"
                }`}
                data-ocid={`menu.filter.${cat.toLowerCase()}`}
              >
                {CATEGORY_EMOJI[cat]} {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <MenuCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {filtered.length > 0 ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                data-ocid="menu.list"
              >
                {filtered.map((item, idx) => (
                  <MenuCard
                    key={item.id.toString()}
                    item={item}
                    index={idx}
                    qty={getQtyInCart(item.id)}
                    onAdd={(e) => {
                      e.stopPropagation();
                      handleAdd(item);
                    }}
                    onRemove={(e) => {
                      e.stopPropagation();
                      handleRemove(item.id);
                    }}
                    justAdded={justAddedIds.has(item.id.toString())}
                    onCardClick={() =>
                      navigate({
                        to: "/food/$foodId",
                        params: { foodId: item.id.toString() },
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="menu.empty_state"
              >
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-muted-foreground text-lg">
                  {search
                    ? `No items found for "${search}"`
                    : "No items in this category right now."}
                </p>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 text-primary text-sm underline underline-offset-2 hover:text-primary/80 transition-smooth"
                    data-ocid="menu.clear_search_button"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Pre-booking offer note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-primary bg-primary/8 border border-primary/20 px-5 py-3 rounded-xl text-sm font-medium">
            <Tag className="w-4 h-4" />
            <span>
              <strong>Special Offer:</strong> Get 10% off on select items when
              you pre-book your table.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
