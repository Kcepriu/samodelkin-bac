/**
 * about-us-section router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::about-us-section.about-us-section",
  {
    config: {
      find: {
        middlewares: ["api::about-us-section.about-us-info"],
      },
    },
  }
);
