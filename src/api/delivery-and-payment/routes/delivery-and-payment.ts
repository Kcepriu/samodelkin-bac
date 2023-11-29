/**
 * delivery-and-payment router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::delivery-and-payment.delivery-and-payment",
  {
    config: {
      find: {
        middlewares: ["api::delivery-and-payment.delivery-and-payment"],
      },
    },
  }
);
