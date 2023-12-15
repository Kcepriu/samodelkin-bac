export default (plugin) => {
  plugin.routes["content-api"].routes = plugin.routes["content-api"].routes.map(
    (item) => {
      if (item.method == "PUT" && item.path == "/users/:id") {
        const addMiddlewares = ["global::its-me", "global::users-info"];
        if (typeof item.config.middlewares === "undefined") {
          item.config.middlewares = addMiddlewares;
        } else {
          item.config.middlewares.push(...addMiddlewares);
        }
      } else if (item.method == "GET" && item.path == "/users/me") {
        if (typeof item.config.middlewares === "undefined") {
          item.config.middlewares = ["global::users-info"];
        } else {
          item.config.middlewares.push("global::users-info");
        }
      }
      return item;
    }
  );
  return plugin;
};
