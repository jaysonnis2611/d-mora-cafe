import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  MenuItem,
  Order,
  OrderRequest,
  Reservation,
  ReservationRequest,
} from "../backend";
import { MenuCategory, createActor } from "../backend";

export function useMenuItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMenuItemsByCategory(category: MenuCategory) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateReservation() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Reservation, Error, ReservationRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createReservation(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

export function useReservations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReservations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Order, Error, OrderRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.createOrder(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export { MenuCategory };
