/**
 * favorite router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::favorite.favorite", {
  config: {
    find: {
      middlewares: ["api::favorite.favorite-info"],
    },
    create: {
      middlewares: ["api::favorite.favorite-info"],
    },
  },
});
