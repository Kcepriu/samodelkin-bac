/**
 * category-description controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::category-description.category-description",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      const filter = !isNaN(+id)
        ? { category: id }
        : { category: { slug: id } };

      sanitizedQueryParams.filters = filter;

      const { results } = await strapi
        .service("api::category-description.category-description")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },
  })
);
