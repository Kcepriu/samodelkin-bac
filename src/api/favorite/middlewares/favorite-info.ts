import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      products: {
        fields: ["*"],
        populate: {
          images: {
            fields: ["*"],
          },
          languages: {
            fields: ["*"],
          },
        },
      },
    };

    await next();
  };
};
