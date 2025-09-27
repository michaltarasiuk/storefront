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
      return `/orders/${id}`;
    },
  },
  checkout: {
    information: "/checkout/information",
    delivery: "/checkout/delivery",
    billing: "/checkout/billing",
    review: "/checkout/review",
    order(id: string) {
      return `/checkout/${id}`;
    },
  },
};
