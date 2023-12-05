/**
 * about-user router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::about-user.about-user", {
  config: {
    find: {
      middlewares: ["api::about-user.about-user-info"],
    },
    create: {
      middlewares: ["api::about-user.about-user-info"],
    },
  },
});
