import {joinPathSegments} from "@/utils/pathname";

export const Routes = {
  home: "/",
  cart: "/cart",
  account: {
    signup: "/signup",
    signin: "/signin",
    confirmAccount: "/confirm-account",
    orders: "/orders",
    profile: "/profile",
    settings: "/settings",
    order(id: string) {
      return joinPathSegments(this.orders, id);
    },
  },
};
