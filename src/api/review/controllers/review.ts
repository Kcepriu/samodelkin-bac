/**
 * review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::review.review",
  ({ strapi }) => ({
    // * create
    async create(ctx) {
      const query = ctx.request.query;
      const data = ctx.request.body;
      const files = ctx.request.files;

      if (ctx.state.user) data.data.user = ctx.state.user.id;

      data.data.date = Date.now();
      data.data.isPublication = false;
      data.data.shortContent = data.data.content.slice(0, 25);

      const results = await strapi
        .service("api::review.review")
        .create({ ...query, ...data, files });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

    // * replyToReview
    async replyToReview(ctx) {
      const { id } = ctx.params;
      const data = ctx.request.body;
      const query = ctx.request.query;

      if (ctx.state.user) data.data.user = ctx.state.user.id;
      data.data.date = Date.now();
      data.data.isPublication = true;
      data.data.shortContent = data.data.content.slice(0, 25);

      const foundReview = await strapi
        .service("api::review.review")
        .findOne(id, { populate: { replyReview: true } });

      if (!foundReview) ctx.throw(400, "Not found");

      const { replyReview } = foundReview;
      replyReview.push(data.data);

      const results = await strapi.service("api::review.review").update(id, {
        ...query,
        data: {
          replyReview,
        },
      });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

    // * changeStatusReview
    async changeStatusReview(ctx) {
      const { id } = ctx.params;
      const data = ctx.request.body;
      const query = ctx.request.query;
      const { isPublication } = data.data;

      const foundReview = await strapi
        .service("api::review.review")
        .findOne(id);

      if (!foundReview) ctx.throw(400, "Not found");

      const results = await strapi.service("api::review.review").update(id, {
        ...query,
        data: {
          isPublication,
        },
      });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

    // * changeReplyToReview
    async changeReplyToReview(ctx) {
      const { id, idReply } = ctx.params;
      const data = ctx.request.body;
      const query = ctx.request.query;
      const { isPublication, content } = data.data;

      const foundReview = await strapi
        .service("api::review.review")
        .findOne(id, { populate: { replyReview: true } });

      if (!foundReview) ctx.throw(400, "Not found");

      const { replyReview } = foundReview;

      const newReplyReview = replyReview.map((reply) => {
        if (reply.id === Number(idReply)) {
          reply.isPublication = isPublication;
          if (content) {
            reply.content = content;
            reply.shortContent = content.slice(0, 25);
          }
        }

        return reply;
      });

      const results = await strapi.service("api::review.review").update(id, {
        ...query,
        data: {
          replyReview: newReplyReview,
        },
      });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

    // * lastReviews
    async lastReviews(ctx) {
      const { category, count, populate } = ctx.request.query;

      const results = await strapi
        .service("api::review.review")
        .getLastReviews(category, count, populate);

      if (results.error) {
        ctx.throw(400, results.message);
      }

      const sanitizedResults = await this.sanitizeOutput(results.response, ctx);
      return this.transformResponse(sanitizedResults, {});
    },
    // * myReviews
    async myReviews(ctx) {
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
        .service("api::review.review")
        .find(sanitizedQueryParams);

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    // * getInfoProductReview
    async getInfoProductReview(ctx) {
      const { productId } = ctx.params;

      const results = await strapi.db
        .connection("reviews")
        .join(
          "reviews_product_links",
          "reviews.id",
          "=",
          "reviews_product_links.review_id"
        )
        .where({
          is_publication: true,
          "reviews_product_links.product_id": productId,
        })
        .select(
          strapi.db.connection.raw("COUNT(reviews.id) as count"),
          strapi.db.connection.raw("SUM(rating) as sum"),
          strapi.db.connection.raw("AVG(rating) as avg")
        );

      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults);
    },
  })
);
