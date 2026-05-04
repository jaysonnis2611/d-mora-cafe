import Types "../types/order";
import Map "mo:core/Map";

module {
  public func place(orders : Map.Map<Nat, Types.Order>, nextId : Nat, req : Types.OrderRequest, now : Int) : Types.Order {
    let order : Types.Order = {
      id = nextId;
      items = req.items;
      customerName = req.customerName;
      phone = req.phone;
      email = req.email;
      serviceType = req.serviceType;
      deliveryAddress = req.deliveryAddress;
      paymentMethod = req.paymentMethod;
      totalAmount = req.totalAmount;
      status = #Received;
      createdAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func get(orders : Map.Map<Nat, Types.Order>, id : Nat) : ?Types.Order {
    orders.get(id);
  };

  public func getAll(orders : Map.Map<Nat, Types.Order>) : [Types.Order] {
    orders.values().toArray();
  };
};
