export default (config, { strapi }) => {
  return async (ctx, next) => {
    const { uid } = config;
    const { id } = ctx.params;
    const filters = { user: ctx.state.user.id, id };

    const { results } = await strapi.service(uid).find({ filters });

    if (results.length === 0) return false;

    await next();
  };
};
