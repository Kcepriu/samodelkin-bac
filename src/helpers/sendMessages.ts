import { Strapi } from "@strapi/strapi";
import { IOrder } from "../types/order.type";
import { IReview } from "../types/review.type";
import { FRONTEND_ROUTES } from "../constants/app-keys.const";
import { formatDateOrder } from "./formatDateTime";
import { formatPrice } from "./formatNumber";

const getDataOrderToSend = (strapi: Strapi, order: IOrder) => {
  const url_front_end = strapi.config.get("server.url_front_end", "");

  const order_number = order.id;
  const { products, date, totalSum, contactInformation, addressDelivery } =
    order.attributes;

  // if (!contactInformation || !contactInformation?.email) return;

  const order_date = formatDateOrder(date);

  const userName =
    !!contactInformation.firstName || !!contactInformation.lastName
      ? `${contactInformation?.firstName || ""} ${
          contactInformation?.lastName || ""
        }`
      : "";

  const emailTo = contactInformation.email || "";

  const phoneNumber = contactInformation.phoneNumber || "";
  const city = addressDelivery?.city || "";
  const postOffice = addressDelivery?.postOffice || "";
  const delivery_service =
    addressDelivery?.delivery_service?.data?.attributes?.title || "";
  const url_product = `${url_front_end}${FRONTEND_ROUTES.PRODUCTS}`;
  const newProducts = products.map(({ count, sum, price, product }) => {
    const title = product?.data?.attributes?.title || "";
    const arrImage = product?.data?.attributes?.images?.data || [];
    const urlImage = arrImage.length > 0 ? arrImage[0].attributes.url : "";
    const urlProduct = `${url_product}/${
      product?.data?.attributes?.slug || ""
    }`;
    return {
      count,
      sum: formatPrice(sum),
      price: formatPrice(price),
      title,
      urlImage,
      urlProduct,
    };
  });

  return {
    emailTo,
    order_number,
    data: {
      userName,
      heading: `${
        !!userName ? userName + ", д" : "Д"
      }якуємо за ваше замовлення!`,
      order_number,
      order_date,
      products: newProducts,
      phoneNumber,
      city,
      postOffice,
      delivery_service,
      totalSum: formatPrice(totalSum),
    },
  };
};

export const sendOrderToMail = async (strapi: Strapi, order: IOrder) => {
  const { emailTo, order_number, data } = getDataOrderToSend(strapi, order);

  try {
    const { composedText = "" } = await strapi.plugins[
      "email-designer"
    ].services.email.compose({
      templateReferenceId: 2,
      data,
    });

    await strapi
      .plugin("telegram-bot-strapi")
      .telegramBot.sendMessageToAdmins(composedText);
  } catch (err) {
    strapi.log.debug("📺: ", err);
  }

  // * Send to Mail
  if (!!emailTo) {
    try {
      await strapi
        .plugin("email-designer")
        .service("email")
        .sendTemplatedEmail(
          {
            to: emailTo,
            // from: "umbrellas_shop@ukr.net",
            // replyTo: "umbrellas_shop@ukr.net",
            attachments: [],
          },
          {
            templateReferenceId: 1,
            subject: `Замовлення № ${order_number}`,
          },
          {
            ...data,
          }
        );
    } catch (err) {
      strapi.log.debug("📺: ", err);
      // return ctx.badRequest(null, err);
    }
  }
};

export const sendReviewToAdmin = async (strapi: Strapi, review: IReview) => {
  if (!review) return;
  const { id, attributes } = review;

  const data = { id, ...attributes, date: formatDateOrder(attributes.date) };
  try {
    const { composedText = "" } = await strapi.plugins[
      "email-designer"
    ].services.email.compose({
      templateReferenceId: 3,
      data,
    });

    await strapi
      .plugin("telegram-bot-strapi")
      .telegramBot.sendMessageToAdmins(composedText);
  } catch (err) {
    strapi.log.debug("📺: ", err);
  }
};
