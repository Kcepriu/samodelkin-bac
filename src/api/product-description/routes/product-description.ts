/**
 * product-description router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::product-description.product-description",
  {
    config: {
      find: {
        middlewares: ["api::product-description.product-description-info"],
      },
      findOne: {
        middlewares: ["api::product-description.product-description-info"],
      },
    },
  }
);
