/**
 * review service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::review.review",
  ({ strapi }) => ({
    async getLastReviews(category, count, populate) {
      const filterCategoty = !category
        ? {}
        : { product: { categories: category } };
      const response = await strapi.db.query("api::review.review").findMany({
        select: ["*"],
        where: { isPublication: true, ...filterCategoty },

        orderBy: { date: "DESC" },
        limit: count || 5,
        populate,
      });

      if (!response) {
        return { message: "Error get Last reviews", error: true };
      }

      return { response };
    },
  })
);
