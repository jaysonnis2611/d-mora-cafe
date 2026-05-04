import MenuTypes "types/menu";
import ResTypes "types/reservation";
import OrderTypes "types/order";
import MenuApiMixin "mixins/menu-api";
import ReservationApiMixin "mixins/reservation-api";
import OrderApiMixin "mixins/order-api";
import MenuLib "lib/menu";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  let menuItems = List.empty<MenuTypes.MenuItem>();
  let nextMenuId = { var value : Nat = 1 };

  let reservations = List.empty<ResTypes.Reservation>();
  let nextResId = { var value : Nat = 1 };

  let orders = Map.empty<Nat, OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 1 };

  // Seed menu on first deploy (only if empty)
  if (menuItems.size() == 0) {
    let seedItems : [(Text, MenuTypes.MenuCategory, Text, Nat)] = [
      ("Penne Arrabbiata", #Pasta, "Spicy penne pasta in a rich tomato-chili sauce", 180),
      ("Spaghetti Aglio e Olio", #Pasta, "Classic spaghetti with garlic, olive oil, and herbs", 170),
      ("Creamy Alfredo Pasta", #Pasta, "Silky creamy Alfredo sauce with penne pasta", 200),
      ("Rose Pasta", #Pasta, "A blend of tomato and cream sauce with penne", 220),
      ("Classic Cold Coffee", #ColdCoffee, "Chilled blended coffee with milk and ice cream", 120),
      ("Caramel Cold Coffee", #ColdCoffee, "Cold coffee with a rich caramel drizzle", 140),
      ("Hazelnut Cold Coffee", #ColdCoffee, "Cold coffee infused with hazelnut flavour", 150),
      ("Plain Garlic Bread", #GarlicBread, "Crispy toasted bread with garlic butter", 80),
      ("Cheesy Garlic Bread", #GarlicBread, "Garlic bread loaded with melted cheese", 100),
      ("Herb Garlic Bread", #GarlicBread, "Garlic bread with mixed Italian herbs", 90),
      ("Classic Bruschetta", #Bruschetta, "Toasted bread topped with fresh tomato and basil", 130),
      ("Chili Cheese Bruschetta", #Bruschetta, "Bruschetta with spicy chili and melted cheese", 150),
      ("Paneer Wrap", #Wraps, "Soft wrap filled with spiced paneer and veggies", 160),
      ("Mixed Veg Wrap", #Wraps, "Hearty wrap with seasoned mixed vegetables", 140),
      ("Fresh Lime Soda", #Other, "Refreshing lime soda served chilled", 70),
      ("Chocolate Mousse", #Other, "Rich and creamy chocolate mousse dessert", 130),
    ];
    for ((name, category, description, price) in seedItems.vals()) {
      ignore MenuLib.add(menuItems, nextMenuId.value, { name; category; description; price; vegetarian = true; available = true });
      nextMenuId.value += 1;
    };
  };

  include MenuApiMixin(menuItems, nextMenuId);
  include ReservationApiMixin(reservations, nextResId);
  include OrderApiMixin(orders, nextOrderId);
};
