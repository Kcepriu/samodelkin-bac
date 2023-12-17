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
      middlewares: [
        "api::review.review-info",
        "api::review.review-send-message",
      ],
    },
    delete: {
      middlewares: [
        "api::review.review-info",
        "api::review.is-role-feedback-moderator",
      ],
    },
  },
});
