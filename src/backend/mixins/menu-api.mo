import MenuTypes "../types/menu";
import MenuLib "../lib/menu";
import List "mo:core/List";

mixin (menuItems : List.List<MenuTypes.MenuItem>, nextMenuId : { var value : Nat }) {
  public query func getMenuItems() : async [MenuTypes.MenuItem] {
    MenuLib.getAll(menuItems);
  };

  public query func getMenuItemsByCategory(category : MenuTypes.MenuCategory) : async [MenuTypes.MenuItem] {
    MenuLib.getByCategory(menuItems, category);
  };

  public func addMenuItem(item : { name : Text; category : MenuTypes.MenuCategory; description : Text; price : Nat; vegetarian : Bool; available : Bool }) : async MenuTypes.MenuItem {
    let newItem = MenuLib.add(menuItems, nextMenuId.value, item);
    nextMenuId.value += 1;
    newItem;
  };

  public func updateMenuItem(id : Nat, item : { name : Text; category : MenuTypes.MenuCategory; description : Text; price : Nat; vegetarian : Bool; available : Bool }) : async ?MenuTypes.MenuItem {
    var updated : ?MenuTypes.MenuItem = null;
    menuItems.mapInPlace(
      func(existing : MenuTypes.MenuItem) : MenuTypes.MenuItem {
        if (existing.id == id) {
          let u : MenuTypes.MenuItem = { existing with name = item.name; category = item.category; description = item.description; price = item.price; vegetarian = item.vegetarian; available = item.available };
          updated := ?u;
          u;
        } else {
          existing;
        };
      }
    );
    updated;
  };

  public func deleteMenuItem(id : Nat) : async Bool {
    let before = menuItems.size();
    let filtered = menuItems.filter(func(item : MenuTypes.MenuItem) : Bool { item.id != id });
    menuItems.clear();
    menuItems.append(filtered);
    menuItems.size() < before;
  };
};
