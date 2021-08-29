import { action, observable } from "mobx";
import { Auth } from "../types";

//observable defines a trackable field that stores the state.
//action marks a method as action that will modify the state.

export class AuthStore {
    @observable auth?: Auth;

    @action
    saveAuth(auth: Auth) {
        this.auth = auth;
    }

    @action
    reset() {
        this.auth = undefined;
    }
}