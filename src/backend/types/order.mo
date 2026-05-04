import Common "common";

module {
  public type ServiceType = {
    #DineIn;
    #Takeaway;
    #Delivery;
  };

  public type PaymentMethod = {
    #UPI;
    #Card;
  };

  public type OrderStatus = {
    #Received;
    #Preparing;
    #Ready;
    #Delivered;
  };

  public type OrderItem = {
    menuItemId : Nat;
    name : Text;
    qty : Nat;
    price : Nat;
  };

  public type Order = {
    id : Nat;
    items : [OrderItem];
    customerName : Text;
    phone : Text;
    email : Text;
    serviceType : ServiceType;
    deliveryAddress : ?Text;
    paymentMethod : PaymentMethod;
    totalAmount : Nat;
    status : OrderStatus;
    createdAt : Common.Timestamp;
  };

  public type OrderRequest = {
    items : [OrderItem];
    customerName : Text;
    phone : Text;
    email : Text;
    serviceType : ServiceType;
    deliveryAddress : ?Text;
    paymentMethod : PaymentMethod;
    totalAmount : Nat;
  };
};
