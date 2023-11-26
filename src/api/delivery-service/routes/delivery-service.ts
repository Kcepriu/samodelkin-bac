/**
 * delivery-service router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::delivery-service.delivery-service",
  {
    config: {
      find: {
        middlewares: ["api::delivery-service.delivery-service-info"],
      },
    },
  }
);
