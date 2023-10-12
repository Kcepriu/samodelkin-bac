/**
 * review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::review.review",
  ({ strapi }) => ({
    async create(ctx) {
      const query = ctx.request.query;
      const data = ctx.request.body;
      const files = ctx.request.files;

      // data.data.user = ctx.state.user.id;
      data.data.date = Date.now();
      data.data.isPublication = false;
      data.data.shortContent = data.data.content.slice(0, 25);

      const results = await strapi
        .service("api::review.review")
        .create({ ...query, ...data, files });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

    async replyToReview(ctx) {
      const { id } = ctx.params;
      const data = ctx.request.body;
      const query = ctx.request.query;

      // data.data.user = ctx.state.user.id;
      data.data.date = Date.now();
      data.data.isPublication = false;
      data.data.shortContent = data.data.content.slice(0, 25);

      const foundReview = await strapi
        .service("api::review.review")
        .findOne(id, { populate: { replyReview: true } });

      if (!foundReview) ctx.throw(400, "Not found");

      const { replyReview } = foundReview;
      replyReview.push(data.data);

      //  const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      //  sanitizedQueryParams.filters = { id };

      const results = await strapi.service("api::review.review").update(id, {
        ...query,
        data: {
          replyReview,
        },
      });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, {});
    },

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
  })
);
