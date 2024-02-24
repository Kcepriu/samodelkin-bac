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
    const { body } = ctx.request;

    strapi.log.info("In reviews middleware.");

    await next();
  };
};
