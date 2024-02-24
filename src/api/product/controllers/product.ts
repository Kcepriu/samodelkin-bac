/**
 * product controller
 */

import { factories } from "@strapi/strapi";
import { createSqlTextGetListFilters } from "../../../helpers/filtersProduct";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async find(ctx) {
      const { characteristics: filterCharacteristics = null } =
        ctx.request.query.filters &&
        typeof ctx.request.query.filters === "object"
          ? ctx.request.query.filters
          : {};

      //  ~ filterCharacteristics: { id_1: [ '4-6', '10-16' ], id_2: '18+', id_price: '500' }

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const filterCategory = sanitizedQueryParams?.category;

      const listProduct = !filterCharacteristics
        ? null
        : await strapi
            .service("api::product.product")
            .getFilteredProduct(filterCharacteristics, filterCategory);

      const filter = !listProduct ? {} : { id: { $in: listProduct } };

      const {
        //@ts-ignore
        characteristics = null,
        ...otherFilters
      } =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
          ? sanitizedQueryParams.filters
          : {};

      sanitizedQueryParams.filters = { ...otherFilters, ...filter };

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

      sanitizedQueryParams.filters =
        sanitizedQueryParams.filters &&
        typeof sanitizedQueryParams.filters === "object"
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

    async getProductsByList(ctx) {
      const data = ctx.request.body;
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      sanitizedQueryParams.filters = {
        id: {
          $in: data,
        },
      };

      const entries = await strapi.entityService.findMany(
        "api::product.product",
        sanitizedQueryParams
      );

      const sanitizedResults = await this.sanitizeOutput(entries, ctx);

      return this.transformResponse(sanitizedResults);
    },

    async getFilters(ctx) {
      const { categories } = ctx.params;
      const resultsQuery = await strapi.db.connection.raw(
        createSqlTextGetListFilters(categories)
      );

      const result = this.transformResponse(resultsQuery.rows);

      return result;
    },
  })
);
