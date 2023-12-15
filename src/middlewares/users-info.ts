export default (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = {
      fields: ["*"],
      additional_roles: {
        fields: ["*"],
      },
    };

    await next();
  };
};
