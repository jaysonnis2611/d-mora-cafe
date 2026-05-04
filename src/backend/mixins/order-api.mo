import OrderTypes "../types/order";
import OrderLib "../lib/order";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (orders : Map.Map<Nat, OrderTypes.Order>, nextOrderId : { var value : Nat }) {
  public func createOrder(req : OrderTypes.OrderRequest) : async OrderTypes.Order {
    let order = OrderLib.place(orders, nextOrderId.value, req, Time.now());
    nextOrderId.value += 1;
    order;
  };

  public query func getOrders() : async [OrderTypes.Order] {
    OrderLib.getAll(orders);
  };

  public func updateOrderStatus(id : Nat, status : OrderTypes.OrderStatus) : async Bool {
    switch (orders.get(id)) {
      case null { false };
      case (?existing) {
        orders.add(id, { existing with status = status });
        true;
      };
    };
  };
};
