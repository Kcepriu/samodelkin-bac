import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      product: {
        fields: ["*"],
        populate: {
          images: {
            fields: ["*"],
          },
        },
      },
      replyReview: {
        fields: ["*"],
      },
    };

    await next();
  };
};
