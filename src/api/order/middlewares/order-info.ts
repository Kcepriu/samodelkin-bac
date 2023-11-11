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
            },
          },
        },
      },
      adresDelivery: {
        fields: ["*"],
        populate: {
          delivery_service: {
            fields: ["*"],
          },
        },
      },
    };

    await next();
  };
};
