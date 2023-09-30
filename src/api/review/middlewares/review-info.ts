/**
 * `review-info` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      // user: {
      //   fields: ["fullName"],
      // },
      product: {
        fields: [
          "code",
          "slug",
          "descrition",
          "title",
          "firstName",
          "secondName",
        ],
        populate: {
          images: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "width",
              "height",
              "hash",
              "ext",
              "mime",
              "size",
              "url",
              "previewUrl",
              "formats",
            ],
          },
        },
      },
      replyReview: {
        fields: ["content", "date", "isPublication", "firstName", "secondName"],
        // populate: {
        //   user: {
        //     fields: ["fullName"],
        //   },
        // },
      },
    };

    await next();
  };
};
