/**
 * category controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filter = !isNaN(+id) ? { id: id } : { slug: id };

      sanitizedQueryParams.filters =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
          ? {
              ...sanitizedQueryParams.filters,
              ...filter,
            }
          : filter;

      const { results, pagination } = await strapi
        .service("api::category.category")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
