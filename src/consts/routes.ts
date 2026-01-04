import {joinPathname} from "#app/utils/pathname";

export const ROUTES = {
  home: "/",
  cart: "/cart",
  auth: {
    signup: "/signup",
    signin: "/signin",
    confirmAccount: "/confirm-account",
  },
  account: {
    orders: "/account/orders",
    profile: "/account/profile",
    settings: "/account/settings",
    order(id: string) {
      return joinPathname(this.orders, id);
    },
  },
  checkout: {
    information: "/checkout/information",
    delivery: "/checkout/delivery",
    billing: "/checkout/billing",
    review: "/checkout/review",
    order(id: string) {
      return joinPathname("checkout", id);
    },
  },
};
