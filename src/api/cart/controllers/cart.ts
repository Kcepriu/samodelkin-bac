/**
 * cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cart.cart",
  ({ strapi }) => ({
    async find(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filterUser = { user: ctx.state.user.id };

      sanitizedQueryParams.filters =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
          ? {
              ...sanitizedQueryParams.filters,
              ...filterUser,
            }
          : filterUser;

      const { results, pagination } = await strapi
        .service("api::cart.cart")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults, { pagination });
    },

    async create(ctx) {
      const query = ctx.request.query;
      const data = ctx.request.body;
      const files = ctx.request.files;
      const user = ctx.state.user;
      data.data.user = user.id;

      const { results: resultsFindPrevFavorite } = await strapi
        .service("api::cart.cart")
        .find({ filters: { user: user.id } });

      let results = null;

      if (resultsFindPrevFavorite.length > 0) {
        // * Update
        const entityId = resultsFindPrevFavorite[0].id;
        results = await strapi
          .service("api::cart.cart")
          .update(entityId, { ...query, ...data, files });
      } else {
        // * create
        results = await strapi
          .service("api::cart.cart")
          .create({ ...query, ...data, files });
      }

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },
  })
);
