import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    available: boolean;
    category: MenuCategory;
    price: bigint;
    vegetarian: boolean;
}
export type Timestamp = bigint;
export interface OrderItem {
    qty: bigint;
    name: string;
    price: bigint;
    menuItemId: bigint;
}
export interface Reservation {
    id: bigint;
    status: ReservationStatus;
    date: string;
    time: string;
    guestName: string;
    zomatoLink: string;
    partySize: bigint;
    phone: string;
}
export interface ReservationRequest {
    date: string;
    time: string;
    guestName: string;
    partySize: bigint;
    phone: string;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    deliveryAddress?: string;
    serviceType: ServiceType;
    paymentMethod: PaymentMethod;
    createdAt: Timestamp;
    email: string;
    totalAmount: bigint;
    phone: string;
    items: Array<OrderItem>;
}
export interface OrderRequest {
    customerName: string;
    deliveryAddress?: string;
    serviceType: ServiceType;
    paymentMethod: PaymentMethod;
    email: string;
    totalAmount: bigint;
    phone: string;
    items: Array<OrderItem>;
}
export enum MenuCategory {
    Bruschetta = "Bruschetta",
    ColdCoffee = "ColdCoffee",
    Pasta = "Pasta",
    Wraps = "Wraps",
    GarlicBread = "GarlicBread",
    Other = "Other"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Ready = "Ready",
    Preparing = "Preparing",
    Received = "Received"
}
export enum PaymentMethod {
    UPI = "UPI",
    Card = "Card"
}
export enum ReservationStatus {
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum ServiceType {
    Delivery = "Delivery",
    Takeaway = "Takeaway",
    DineIn = "DineIn"
}
export interface backendInterface {
    addMenuItem(item: {
        name: string;
        description: string;
        available: boolean;
        category: MenuCategory;
        price: bigint;
        vegetarian: boolean;
    }): Promise<MenuItem>;
    createOrder(req: OrderRequest): Promise<Order>;
    createReservation(req: ReservationRequest): Promise<Reservation>;
    deleteMenuItem(id: bigint): Promise<boolean>;
    getMenuItems(): Promise<Array<MenuItem>>;
    getMenuItemsByCategory(category: MenuCategory): Promise<Array<MenuItem>>;
    getOrders(): Promise<Array<Order>>;
    getReservations(): Promise<Array<Reservation>>;
    updateMenuItem(id: bigint, item: {
        name: string;
        description: string;
        available: boolean;
        category: MenuCategory;
        price: bigint;
        vegetarian: boolean;
    }): Promise<MenuItem | null>;
    updateOrderStatus(id: bigint, status: OrderStatus): Promise<boolean>;
    updateReservationStatus(id: bigint, status: ReservationStatus): Promise<boolean>;
}
