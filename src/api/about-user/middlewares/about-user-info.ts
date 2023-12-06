import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      fields: ["*"],

      user: {
        fields: ["*"],
      },
      contactInformation: {
        fields: ["*"],
      },
      addressDelivery: {
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
