/**
 * product-description controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product-description.product-description",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      const filter = !isNaN(+id) ? { product: id } : { product: { slug: id } };

      sanitizedQueryParams.filters = filter;

      const { results } = await strapi
        .service("api::product-description.product-description")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },
  })
);
