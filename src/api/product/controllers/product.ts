/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filter = {};

      sanitizedQueryParams.filters = sanitizedQueryParams.filters
        ? {
            ...sanitizedQueryParams.filters,
            ...filter,
          }
        : filter;

      const { results, pagination } = await strapi
        .service("api::product.product")
        .find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filter = !isNaN(+id) ? { id: id } : { slug: id };

      sanitizedQueryParams.filters = sanitizedQueryParams.filters
        ? {
            ...sanitizedQueryParams.filters,
            ...filter,
          }
        : filter;

      const { results, pagination } = await strapi
        .service("api::product.product")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
