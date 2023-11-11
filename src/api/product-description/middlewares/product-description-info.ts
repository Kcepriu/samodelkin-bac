import { Strapi } from "@strapi/strapi";
import { fieldsProductShort } from "../../../constants/fieldsMiddleware";

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = {
      product: {
        fields: fieldsProductShort,
      },
      content: {
        fields: ["*"],

        populate: {
          image: {
            fields: ["*"],
          },
        },
      },
    };

    await next();
  };
};
