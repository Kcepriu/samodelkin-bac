/**
 * `reviews` middleware
 */

// TODO delete this module
import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    // const { model } = ctx.params;
    // const user = ctx.state.user;
    console.log("🚀 ~ ctx.params:", ctx.params);
    const { body } = ctx.request;
    console.log("🚀 ~ body:", body);

    strapi.log.info("In reviews middleware.");
    console.log("config", config);

    await next();
  };
};
