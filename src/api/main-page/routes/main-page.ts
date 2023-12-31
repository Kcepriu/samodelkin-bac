/**
 * main-page router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::main-page.main-page", {
  config: {
    find: {
      middlewares: ["api::main-page.main-page-info"],
    },
  },
});
