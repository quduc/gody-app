import { action, observable } from "mobx";
import { Auth, Booking, Location } from "../types";

//observable defines a trackable field that stores the state.
//action marks a method as action that will modify the state.

export class AuthStore {
    @observable auth?: Auth;
    @observable userLocation?: Location;

    @observable booking?: Booking;
    @observable defaultPayment?: any;

    @action
    saveAuth(auth: Auth) {
        this.auth = auth;
    }

    @action
    saveBooking(booking: Booking) {
        this.booking = booking;
    }
    @action
    saveCurrentUserLocation(userLocation: Location) {
        this.userLocation = userLocation;
    }



    @action
    reset() {
        this.auth = undefined;
        this.userLocation = undefined;
        this.booking = undefined;
    }
}