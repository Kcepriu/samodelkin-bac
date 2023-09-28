/**
 * product router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::product.product", {
  config: {
    find: {
      middlewares: ["api::product.product-info"],
    },
    findOne: {
      middlewares: ["api::product.product-info"],
    },
  },
});
