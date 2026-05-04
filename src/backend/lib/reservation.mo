import Types "../types/reservation";
import List "mo:core/List";

module {
  public func add(reservations : List.List<Types.Reservation>, nextId : Nat, req : Types.ReservationRequest) : Types.Reservation {
    let reservation : Types.Reservation = {
      id = nextId;
      guestName = req.guestName;
      phone = req.phone;
      date = req.date;
      time = req.time;
      partySize = req.partySize;
      status = #Pending;
      zomatoLink = "https://www.zomato.com";
    };
    reservations.add(reservation);
    reservation;
  };

  public func getAll(reservations : List.List<Types.Reservation>) : [Types.Reservation] {
    reservations.toArray();
  };
};
