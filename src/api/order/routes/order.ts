/**
 * order router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::order.order", {
  config: {
    find: {
      middlewares: ["api::order.order-info"],
    },
    findOne: {
      middlewares: ["api::order.order-info"],
    },
    create: {
      middlewares: ["api::order.order-info", "api::order.order-send-message"],
    },
    update: {
      middlewares: [
        "api::order.order-info",
        {
          name: "global::is-owner",
          config: { uid: "api::order.order" },
        },
      ],
    },
    delete: {
      middlewares: [
        "api::order.order-info",
        {
          name: "global::is-owner",
          config: { uid: "api::order.order" },
        },
      ],
    },
  },
});
