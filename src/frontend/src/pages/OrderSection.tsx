import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { usePlaceOrder } from "../hooks/use-backend";
import { PaymentMethod, ServiceType } from "../types";

interface CheckoutForm {
  serviceType: ServiceType;
  deliveryAddress: string;
}

const INITIAL_FORM: CheckoutForm = {
  serviceType: ServiceType.DineIn,
  deliveryAddress: "",
};

const DELIVERY_CHARGE = 50n;
const TAX_RATE = 0.1;

// Map item name keywords → food image
const FOOD_IMAGES: Array<{ keywords: string[]; src: string }> = [
  {
    keywords: [
      "pasta",
      "penne",
      "spaghetti",
      "fettuccine",
      "linguine",
      "arabiata",
      "alfredo",
      "bolognese",
    ],
    src: "/assets/generated/food-pasta.dim_600x400.jpg",
  },
  {
    keywords: [
      "cold coffee",
      "coffee",
      "cappuccino",
      "latte",
      "mocha",
      "espresso",
      "frappe",
    ],
    src: "/assets/generated/food-cold-coffee.dim_600x400.jpg",
  },
  {
    keywords: ["garlic bread", "garlic", "bread", "baguette"],
    src: "/assets/generated/food-garlic-bread.dim_600x400.jpg",
  },
  {
    keywords: ["bruschetta", "bruchetta", "chili cheese", "chilli"],
    src: "/assets/generated/food-bruschetta.dim_600x400.jpg",
  },
  {
    keywords: ["wrap", "roll", "burrito", "tortilla"],
    src: "/assets/generated/food-wrap.dim_600x400.jpg",
  },
];

const DEFAULT_FOOD_IMAGE = "/assets/generated/food-pasta.dim_600x400.jpg";

function getFoodImage(name: string): string {
  const lower = name.toLowerCase();
  for (const entry of FOOD_IMAGES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.src;
    }
  }
  return DEFAULT_FOOD_IMAGE;
}

interface ConfirmedOrder {
  orderId: string;
  items: Array<{ name: string; qty: number; price: bigint }>;
  total: bigint;
  serviceType: ServiceType;
}

export default function OrderSection() {
  const { items, total, removeFromCart, updateQty, clearCart } = useCart();
  const { userProfile } = useUser();
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);
  const { mutateAsync, isPending } = usePlaceOrder();

  const deliveryCharge =
    form.serviceType === ServiceType.Delivery ? DELIVERY_CHARGE : 0n;
  const taxAmount = BigInt(Math.round(Number(total) * TAX_RATE));
  const grandTotal = total + taxAmount + deliveryCharge;

  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: bigint }>).detail;
      const item = items.find((i) => i.id === id);
      if (item) updateQty(id, item.qty - 1);
    };
    document.addEventListener("cart:decrement", handler);
    return () => document.removeEventListener("cart:decrement", handler);
  }, [items, updateQty]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.serviceType === ServiceType.Delivery &&
      !form.deliveryAddress.trim()
    ) {
      toast.error("Please provide a delivery address.");
      return;
    }

    const name = userProfile?.name ?? "";
    const phone = userProfile?.phone ?? "";
    const email = userProfile?.email ?? "";

    try {
      const order = await mutateAsync({
        customerName: name,
        phone,
        email,
        serviceType: form.serviceType,
        paymentMethod: PaymentMethod.UPI,
        deliveryAddress:
          form.serviceType === ServiceType.Delivery
            ? form.deliveryAddress
            : undefined,
        totalAmount: grandTotal,
        items: items.map((i) => ({
          menuItemId: i.id,
          name: i.name,
          price: i.price,
          qty: BigInt(i.qty),
        })),
      });
      const orderNum = order.id.toString().padStart(4, "0");
      setConfirmed({
        orderId: `#D-${orderNum}`,
        items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        total: grandTotal,
        serviceType: form.serviceType,
      });
      clearCart();
      toast.success("Order placed! 🎉");
    } catch {
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <section
      id="order"
      className="min-h-screen bg-background py-16"
      data-ocid="order.section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-primary font-semibold text-xs tracking-widest uppercase">
            Online Ordering
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-3">
            Your Order
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Dine-in, Takeaway, or Delivery — we&apos;ve got you covered.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── Confirmation ── */}
          {confirmed ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              data-ocid="order.success_state"
            >
              <Card className="overflow-hidden border border-primary/30">
                <div
                  className="px-8 py-10 text-center"
                  style={{ background: "oklch(var(--primary) / 0.08)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.15,
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
                    style={{ background: "oklch(var(--primary) / 0.18)" }}
                  >
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-1">
                    Order Confirmed!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for choosing D&apos;Mora Cafe & Bistro
                  </p>
                  <Badge className="mt-3 text-base px-5 py-1.5 bg-primary text-primary-foreground font-mono tracking-wider">
                    {confirmed.orderId}
                  </Badge>
                </div>

                <CardContent className="p-8">
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-widest mb-4">
                    Items Ordered
                  </h4>
                  <div className="space-y-3 mb-5">
                    {confirmed.items.map((item) => (
                      <div
                        key={`confirmed-${item.name}`}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={getFoodImage(item.name)}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex flex-1 justify-between min-w-0 text-sm">
                          <span className="text-foreground font-medium truncate">
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              ×{item.qty}
                            </span>
                          </span>
                          <span className="font-semibold ml-4 shrink-0">
                            ₹{(item.price * BigInt(item.qty)).toString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="mb-4" />
                  <div className="flex justify-between font-bold text-base mb-6">
                    <span>Total</span>
                    <span className="text-primary text-lg">
                      ₹{confirmed.total.toString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3 mb-5">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm font-medium text-foreground">
                      Estimated wait:{" "}
                      <span className="text-primary font-semibold">
                        15–30 minutes
                      </span>
                    </p>
                  </div>

                  <div
                    className="border border-primary/20 rounded-xl px-4 py-3 mb-8 text-sm text-muted-foreground"
                    style={{ background: "oklch(var(--primary) / 0.05)" }}
                  >
                    <p className="font-semibold text-foreground mb-0.5">
                      Pay at Counter
                    </p>
                    Pay via UPI or cash at the counter on arrival.{" "}
                    <span className="font-mono font-semibold text-primary">
                      UPI: dmora@upi
                    </span>
                  </div>

                  <div className="text-center text-muted-foreground text-sm mb-6">
                    <UtensilsCrossed className="inline-block w-4 h-4 mr-1.5 text-primary" />
                    Our team is already preparing your order with love. See you
                    soon!
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-primary/40 hover:bg-primary/10"
                    onClick={() => {
                      setConfirmed(null);
                      setShowCheckout(false);
                      setForm(INITIAL_FORM);
                    }}
                    data-ocid="order.new_order_button"
                  >
                    Place Another Order
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : items.length === 0 ? (
            /* ── Empty cart ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
              data-ocid="order.empty_state"
            >
              <Card className="p-14 border border-border">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                  <ShoppingCart className="w-9 h-9 text-muted-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
                  Pick something delicious from our menu and it will appear
                  here.
                </p>
                {/* Food preview images */}
                <div className="flex gap-3 justify-center mb-8 flex-wrap">
                  {[
                    {
                      src: "/assets/generated/food-pasta.dim_600x400.jpg",
                      label: "Pasta",
                    },
                    {
                      src: "/assets/generated/food-cold-coffee.dim_600x400.jpg",
                      label: "Cold Coffee",
                    },
                    {
                      src: "/assets/generated/food-garlic-bread.dim_600x400.jpg",
                      label: "Garlic Bread",
                    },
                    {
                      src: "/assets/generated/food-bruschetta.dim_600x400.jpg",
                      label: "Bruschetta",
                    },
                  ].map((food) => (
                    <div
                      key={food.label}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <img
                        src={food.src}
                        alt={food.label}
                        className="w-20 h-20 rounded-xl object-cover border border-primary/20 hover:border-primary/60 transition-smooth"
                      />
                      <span className="text-xs text-muted-foreground">
                        {food.label}
                      </span>
                    </div>
                  ))}
                </div>
                <Link to="/menu">
                  <Button
                    type="button"
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gold-glow"
                    data-ocid="order.browse_menu_button"
                  >
                    Browse Menu
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ) : (
            /* ── Cart & checkout ── */
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Cart review */}
              <Card
                className="border border-border"
                data-ocid="order.cart_card"
              >
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-5 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Your Cart
                    <Badge variant="secondary" className="ml-auto">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </Badge>
                  </h3>

                  <div className="space-y-3" data-ocid="order.list">
                    {items.map((item, idx) => (
                      <motion.div
                        key={item.id.toString()}
                        layout
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-smooth border border-transparent hover:border-primary/10"
                        data-ocid={`order.item.${idx + 1}`}
                      >
                        {/* Food image */}
                        <img
                          src={getFoodImage(item.name)}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-primary/15"
                        />

                        {/* Name + price */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ₹{item.price.toString()} each
                          </p>
                        </div>

                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-smooth"
                            aria-label="Decrease quantity"
                            data-ocid={`order.qty_decrease.${idx + 1}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold text-sm w-6 text-center tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth"
                            aria-label="Increase quantity"
                            data-ocid={`order.qty_increase.${idx + 1}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <span className="font-bold text-sm text-primary w-16 text-right tabular-nums">
                          ₹{(item.price * BigInt(item.qty)).toString()}
                        </span>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                          aria-label={`Remove ${item.name}`}
                          data-ocid={`order.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <Separator className="my-5" />

                  {/* Order summary */}
                  <div
                    className="space-y-2 text-sm max-w-xs ml-auto"
                    data-ocid="order.summary"
                  >
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{total.toString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes (10%)</span>
                      <span>₹{taxAmount.toString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        Delivery{" "}
                        {form.serviceType !== ServiceType.Delivery && (
                          <span className="text-xs">(n/a)</span>
                        )}
                      </span>
                      <span>
                        {form.serviceType === ServiceType.Delivery
                          ? `₹${DELIVERY_CHARGE.toString()}`
                          : "Free"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base text-foreground pt-1">
                      <span>Total</span>
                      <span className="text-primary text-lg">
                        ₹{grandTotal.toString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {!showCheckout ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    size="lg"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-semibold"
                    onClick={() => setShowCheckout(true)}
                    data-ocid="order.proceed_checkout_button"
                  >
                    Proceed to Checkout — ₹{grandTotal.toString()}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="border-border hover:border-destructive/50 hover:text-destructive"
                    onClick={clearCart}
                    data-ocid="order.clear_cart_button"
                  >
                    Clear Cart
                  </Button>
                </div>
              ) : (
                /* ── Checkout form ── */
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card
                    className="border border-border"
                    data-ocid="order.checkout_card"
                  >
                    <CardContent className="p-6 sm:p-8">
                      <h3 className="font-display text-xl font-semibold mb-2">
                        Checkout
                      </h3>

                      {/* Profile banner */}
                      {userProfile && (
                        <div
                          className="flex items-center gap-3 rounded-xl border border-primary/20 px-4 py-3 mb-6"
                          style={{
                            background: "oklch(var(--primary) / 0.06)",
                          }}
                        >
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0"
                            style={{
                              background: "oklch(var(--primary) / 0.18)",
                            }}
                          >
                            {userProfile.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {userProfile.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {userProfile.phone} · {userProfile.email}
                            </p>
                          </div>
                        </div>
                      )}

                      <form onSubmit={handlePlaceOrder} className="space-y-6">
                        {/* Service Type */}
                        <div className="space-y-3">
                          <Label>How would you like your order?</Label>
                          <RadioGroup
                            value={form.serviceType}
                            onValueChange={(v) =>
                              setForm((f) => ({
                                ...f,
                                serviceType: v as ServiceType,
                                deliveryAddress: "",
                              }))
                            }
                            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                            data-ocid="order.service_type_radio"
                          >
                            {[
                              {
                                value: ServiceType.DineIn,
                                label: "Dine-In",
                                emoji: "🍽️",
                                desc: "Enjoy at the cafe",
                              },
                              {
                                value: ServiceType.Takeaway,
                                label: "Takeaway",
                                emoji: "🥡",
                                desc: "Pick up yourself",
                              },
                              {
                                value: ServiceType.Delivery,
                                label: "Delivery",
                                emoji: "🛵",
                                desc: "Delivered to you",
                              },
                            ].map((opt) => (
                              <label
                                key={opt.value}
                                htmlFor={`service-${opt.value}`}
                                className={`relative flex flex-col items-center gap-1 p-4 rounded-xl border cursor-pointer transition-smooth ${
                                  form.serviceType === opt.value
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/40 hover:bg-muted/30"
                                }`}
                              >
                                <RadioGroupItem
                                  value={opt.value}
                                  id={`service-${opt.value}`}
                                  className="sr-only"
                                />
                                <span className="text-2xl">{opt.emoji}</span>
                                <span className="font-semibold text-sm text-foreground">
                                  {opt.label}
                                </span>
                                <span className="text-xs text-muted-foreground text-center">
                                  {opt.desc}
                                </span>
                                {form.serviceType === opt.value && (
                                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                                )}
                              </label>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Delivery address (conditional) */}
                        <AnimatePresence>
                          {form.serviceType === ServiceType.Delivery && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1.5">
                                <Label htmlFor="deliveryAddress">
                                  Delivery Address *
                                </Label>
                                <Input
                                  id="deliveryAddress"
                                  placeholder="Street, Area, Nashik"
                                  value={form.deliveryAddress}
                                  onChange={(e) =>
                                    setForm((f) => ({
                                      ...f,
                                      deliveryAddress: e.target.value,
                                    }))
                                  }
                                  required
                                  data-ocid="order.delivery_address_input"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Delivery charge: ₹{DELIVERY_CHARGE.toString()}{" "}
                                  within Nashik city
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Payment info notice */}
                        <div
                          className="flex items-start gap-3 rounded-xl border border-primary/20 px-4 py-3"
                          style={{
                            background: "oklch(var(--primary) / 0.05)",
                          }}
                        >
                          <span className="text-2xl shrink-0">📲</span>
                          <div className="text-sm">
                            <p className="font-semibold text-foreground mb-0.5">
                              Pay at Counter
                            </p>
                            <p className="text-muted-foreground">
                              Pay via UPI, cash, or card at the counter on
                              arrival.{" "}
                              <span className="font-mono font-semibold text-primary">
                                UPI: dmora@upi
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Order summary recap */}
                        <div
                          className="rounded-xl border border-primary/20 p-4"
                          style={{
                            background: "oklch(var(--primary) / 0.05)",
                          }}
                        >
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                            Order Total
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {items.length} item{items.length > 1 ? "s" : ""} +
                              tax
                              {form.serviceType === ServiceType.Delivery
                                ? " + delivery"
                                : ""}
                            </span>
                            <span className="font-display text-2xl font-bold text-primary">
                              ₹{grandTotal.toString()}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button
                            type="submit"
                            size="lg"
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gold-glow font-semibold"
                            disabled={isPending}
                            data-ocid="order.submit_button"
                          >
                            {isPending
                              ? "Placing Order…"
                              : `Place Order — ₹${grandTotal.toString()}`}
                          </Button>
                          <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            className="border-border"
                            onClick={() => setShowCheckout(false)}
                            data-ocid="order.cancel_button"
                          >
                            Back to Cart
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
