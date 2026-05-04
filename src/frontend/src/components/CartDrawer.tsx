import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  const goToOrder = () => {
    onClose();
    setTimeout(() => {
      navigate({ to: "/orders" });
    }, 200);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center text-center"
            data-ocid="cart.empty_state"
          >
            <div className="text-5xl mb-4">🛒</div>
            <p className="font-semibold text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Add items from the menu to get started.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="cart.close_button"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <div
              className="flex-1 overflow-y-auto space-y-3 py-4"
              data-ocid="cart.list"
            >
              {items.map((item, idx) => (
                <div
                  key={item.id.toString()}
                  className="flex items-center gap-3 py-2"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price.toString()} each
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold hover:bg-muted-foreground/20 transition-smooth"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold hover:bg-primary/90 transition-smooth"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-primary w-14 text-right shrink-0">
                    ₹{(item.price * BigInt(item.qty)).toString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-smooth"
                    aria-label={`Remove ${item.name}`}
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total.toString()}</span>
              </div>
              <Button
                type="button"
                className="w-full"
                size="lg"
                onClick={goToOrder}
                data-ocid="cart.checkout_button"
              >
                Checkout
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={clearCart}
                data-ocid="cart.clear_button"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
