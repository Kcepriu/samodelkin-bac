/**
 * order router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::order.order", {
  config: {
    find: {},
    findOne: {},
    create: {},
    update: {
      middlewares: [
        {
          name: "global::is-owner ",
          config: { uid: "api::order.order" },
        },
      ],
    },
    delete: {
      middlewares: [
        {
          name: "global::is-owner ",
          config: { uid: "api::order.order" },
        },
      ],
    },
  },
});
