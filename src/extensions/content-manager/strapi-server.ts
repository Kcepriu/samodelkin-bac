// TODO delete this module

export default (plugin) => {
  const controller = plugin.controllers["collection-types"];

  // Save the original create controller action
  controller.strapiCreate = controller.create;

  // extend action create
  controller.create = async (ctx) => {
    const { model } = ctx.params;
    // const { body } = ctx.request;

    const A_MODEL = "api::review.review";

    // const entityManager = getService('entity-manager');

    if (model == A_MODEL) {
      const data = ctx.request.body;
      console.log("🚀 ~ data:", data);

      data.user = ctx.state.user.id;
      data.date = Date.now();
      data.shortContent = data.content.slice(0, 25);
    }

    return controller.strapiCreate(ctx);
  };

  return plugin;
};
