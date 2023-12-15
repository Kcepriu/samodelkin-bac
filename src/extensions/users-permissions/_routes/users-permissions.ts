import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("plugin::users-permissions.user", {
  config: {
    update: {
      middlewares: [
        {
          name: "global::is-owner",
          config: { uid: "plugin::users-permissions.user" },
        },
      ],
    },

    find: {
      middlewares: [
        {
          name: "global::users-info",
          config: { uid: "plugin::users-permissions.user" },
        },
      ],
    },
  },
});
