export default (config, { strapi }) => {
  return async (ctx, next) => {
    const { id } = ctx.params;

    if (String(ctx.state.user.id) !== String(id)) return false;

    await next();
  };
};
