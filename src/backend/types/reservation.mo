module {
  public type ReservationStatus = {
    #Pending;
    #Confirmed;
    #Cancelled;
  };

  public type Reservation = {
    id : Nat;
    guestName : Text;
    phone : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    status : ReservationStatus;
    zomatoLink : Text;
  };

  public type ReservationRequest = {
    guestName : Text;
    phone : Text;
    date : Text;
    time : Text;
    partySize : Nat;
  };
};
