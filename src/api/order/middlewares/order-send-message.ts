import { Strapi } from "@strapi/strapi";
import { sendOrderToMail } from "../../../helpers/sendMessages";
import { IResponseOrder } from "../../../types/order.type";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    await next();

    const { data: order } = ctx.response.body as IResponseOrder;
    if (!order) return;
    try {
      sendOrderToMail(strapi, order);
    } catch {}
  };
};
