/**
 * category-description router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::category-description.category-description",
  {
    config: {
      find: {
        middlewares: ["api::category-description.category-description-info"],
      },
      findOne: {
        middlewares: ["api::category-description.category-description-info"],
      },
    },
  }
);
