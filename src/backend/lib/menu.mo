import Types "../types/menu";
import List "mo:core/List";

module {
  public func getAll(items : List.List<Types.MenuItem>) : [Types.MenuItem] {
    items.toArray();
  };

  public func getByCategory(items : List.List<Types.MenuItem>, category : Types.MenuCategory) : [Types.MenuItem] {
    items.filter(func(item : Types.MenuItem) : Bool { item.category == category }).toArray();
  };

  public func add(items : List.List<Types.MenuItem>, nextId : Nat, item : { name : Text; category : Types.MenuCategory; description : Text; price : Nat; vegetarian : Bool; available : Bool }) : Types.MenuItem {
    let newItem : Types.MenuItem = {
      id = nextId;
      name = item.name;
      category = item.category;
      description = item.description;
      price = item.price;
      vegetarian = item.vegetarian;
      available = item.available;
    };
    items.add(newItem);
    newItem;
  };
};
