import { Strapi } from "@strapi/strapi";
import { fieldsProductShort } from "../../../constants/fieldsMiddleware";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      fields: ["*"],

      products: {
        fields: ["*"],
        populate: {
          product: {
            fields: fieldsProductShort,
            populate: {
              images: {
                fields: ["*"],
              },
              languages: {
                fields: ["*"],
              },

              relatedProduct: {
                fields: ["title", "code", "slug"],
                populate: {
                  images: { fields: ["*"] },
                },
              },
            },
          },
          language: {
            fields: ["*"],
          },
        },
      },
    };

    await next();
  };
};
