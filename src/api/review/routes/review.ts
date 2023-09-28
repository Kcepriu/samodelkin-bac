/**
 * review router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::review.review", {
  config: {
    find: {
      middlewares: ["api::review.review-info"],
    },
    findOne: {
      middlewares: ["api::review.review-info"],
    },
    create: {
      middlewares: ["api::review.review-info"],
    },
  },
});
