import ResTypes "../types/reservation";
import ResLib "../lib/reservation";
import List "mo:core/List";

mixin (reservations : List.List<ResTypes.Reservation>, nextResId : { var value : Nat }) {
  public func createReservation(req : ResTypes.ReservationRequest) : async ResTypes.Reservation {
    let reservation = ResLib.add(reservations, nextResId.value, req);
    nextResId.value += 1;
    reservation;
  };

  public query func getReservations() : async [ResTypes.Reservation] {
    ResLib.getAll(reservations);
  };

  public func updateReservationStatus(id : Nat, status : ResTypes.ReservationStatus) : async Bool {
    var updated = false;
    reservations.mapInPlace(
      func(r : ResTypes.Reservation) : ResTypes.Reservation {
        if (r.id == id) {
          updated := true;
          { r with status = status };
        } else {
          r;
        };
      }
    );
    updated;
  };
};
