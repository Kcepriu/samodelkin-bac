import { Strapi } from "@strapi/strapi";
import { sendReviewToAdmin } from "../../../helpers/sendMessages";
import { IResponseReview } from "../../../types/review.type";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    await next();

    const { data: review } = ctx.response.body as IResponseReview;
    if (!review) return;
    try {
      sendReviewToAdmin(strapi, review);
    } catch {}
  };
};
