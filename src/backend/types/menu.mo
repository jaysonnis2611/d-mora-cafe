module {
  public type MenuCategory = {
    #Pasta;
    #ColdCoffee;
    #GarlicBread;
    #Bruschetta;
    #Wraps;
    #Other;
  };

  public type MenuItem = {
    id : Nat;
    name : Text;
    category : MenuCategory;
    description : Text;
    price : Nat;
    vegetarian : Bool;
    available : Bool;
  };
};
