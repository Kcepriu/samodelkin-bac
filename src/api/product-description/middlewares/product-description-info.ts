/**
 * `product-description-info` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      product: {
        fields: ["id", "slug"],
      },
      content: {
        fields: ["*"],

        populate: {
          image: {
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
    };

    await next();
  };
};
