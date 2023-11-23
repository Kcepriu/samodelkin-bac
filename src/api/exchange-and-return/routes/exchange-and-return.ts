/**
 * exchange-and-return router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::exchange-and-return.exchange-and-return",
  {
    config: {
      find: {
        middlewares: ["api::exchange-and-return.exchange-and-return"],
      },
    },
  }
);
