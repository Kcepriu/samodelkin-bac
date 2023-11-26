import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      logo: {
        fields: ["*"],
      },
    };

    await next();
  };
};
