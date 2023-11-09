/**
 * revised router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::revised.revised", {
  config: {
    find: {
      middlewares: ["api::revised.revised-info"],
    },
    create: {
      middlewares: ["api::revised.revised-info"],
    },
  },
});
