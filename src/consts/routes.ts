import {joinPathSegments} from "#app/utils/pathname";

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
  checkout: {
    information: "/checkout/information",
    delivery: "/checkout/delivery",
    billing: "/checkout/billing",
    review: "/checkout/review",
    order(id: string) {
      return joinPathSegments("checkout", id);
    },
  },
};
