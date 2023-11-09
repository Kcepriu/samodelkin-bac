/**
 * cart router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::cart.cart", {
  config: {
    find: {
      middlewares: ["api::cart.cart-info"],
    },
    create: {
      middlewares: ["api::cart.cart-info"],
    },
  },
});
