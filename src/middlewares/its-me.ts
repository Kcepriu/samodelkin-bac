export default (config, { strapi }) => {
  return async (ctx, next) => {
    const { id } = ctx.params;
    const { additional_roles, ...data } = ctx.request.body;

    ctx.request.body = data;

    if (String(ctx.state.user.id) !== String(id)) return false;

    await next();
  };
};
