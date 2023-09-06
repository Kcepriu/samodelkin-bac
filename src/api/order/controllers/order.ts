/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",

  ({ strapi }) => ({
    async find(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filterUser = { user: ctx.state.user.id };

      sanitizedQueryParams.filters = sanitizedQueryParams.filters
        ? {
            ...sanitizedQueryParams.filters,
            ...filterUser,
          }
        : filterUser;

      const { results, pagination } = await strapi
        .service("api::order.order")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async findOne(ctx) {
      const { id } = ctx.params;

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filterUser = { user: ctx.state.user.id, id };

      sanitizedQueryParams.filters = sanitizedQueryParams.filters
        ? {
            ...sanitizedQueryParams.filters,
            ...filterUser,
          }
        : filterUser;

      const { results, pagination } = await strapi
        .service("api::order.order")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async create(ctx) {
      const query = ctx.request.query;
      const data = ctx.request.body;
      const files = ctx.request.files;

      data.data.user = ctx.state.user.id;
      if (!data.data.date) data.data.date = Date.now();

      const results = await strapi
        .service("api::order.order")
        .create({ ...query, ...data, files });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },
  })
);
