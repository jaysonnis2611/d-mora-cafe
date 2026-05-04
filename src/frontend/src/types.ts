import type { MenuItem, Order, OrderItem, Reservation } from "./backend";
import {
  MenuCategory,
  OrderStatus,
  PaymentMethod,
  ReservationStatus,
  ServiceType,
} from "./backend";

export type { MenuItem, Order, OrderItem, Reservation };
export {
  MenuCategory,
  OrderStatus,
  PaymentMethod,
  ReservationStatus,
  ServiceType,
};

export interface CartItem {
  id: bigint;
  name: string;
  price: bigint;
  qty: number;
}

export interface CartState {
  items: CartItem[];
  total: bigint;
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: bigint) => void;
  updateQty: (id: bigint, qty: number) => void;
  clearCart: () => void;
}

export interface ReviewData {
  platform: string;
  rating: number;
  maxRating: number;
  count: string;
  snippet: string;
  author: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}
