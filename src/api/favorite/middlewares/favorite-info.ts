import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      products: {
        fields: ["code", "slug", "descrition", "title"],
        populate: {
          images: {
            fields: [
              "id",
              "name",
              "alternativeText",
              "width",
              "height",
              "hash",
              "ext",
              "mime",
              "size",
              "url",
              "previewUrl",
              "formats",
            ],
          },
          languages: {
            fields: ["language"],
          },
        },
      },
    };

    await next();
  };
};
