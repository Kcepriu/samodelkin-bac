/**
 * `product-info` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      categories: {
        fields: ["id", "title", "slug"],
      },
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
      videos: {
        fields: ["url", "active", "title"],
      },
      colorBox: {
        fields: ["title", "color"],
      },
    };

    await next();
  };
};
