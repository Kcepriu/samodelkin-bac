import { Strapi } from "@strapi/strapi";
import { fieldsProductShort } from "../../../constants/fieldsMiddleware";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      // user: {
      //   fields: ["fullName"],
      // },
      product: {
        fields: fieldsProductShort,
        populate: {
          images: {
            fields: ["*"],
          },
        },
      },
      replyReview: {
        fields: ["*"],
        // populate: {
        //   user: {
        //     fields: ["fullName"],
        //   },
        // },
      },
    };

    await next();
  };
};
