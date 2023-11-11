import { Strapi } from "@strapi/strapi";
import { fieldsProductShort } from "../../../constants/fieldsMiddleware";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      products: {
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
    };

    await next();
  };
};
