/**
 * `product-info` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      categories: {
        fields: ["*"],
      },
      images: {
        fields: ["*"],
      },
      colorBox: {
        fields: ["*"],
      },
      videos: {
        fields: ["*"],
      },
      languages: {
        fields: ["*"],
      },
      manual: {
        fields: ["*"],
        populate: {
          file: { fields: ["*"] },
        },
      },
      characteristics: {
        fields: ["*"],
      },
      relatedProduct: {
        fields: ["title", "code", "slug", "images"],
        populate: {
          images: { fields: ["*"] },
        },
      },

      seo: {
        fields: ["*"],
      },
    };

    await next();
  };
};
