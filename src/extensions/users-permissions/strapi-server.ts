export default (plugin) => {
  plugin.routes["content-api"].routes = plugin.routes["content-api"].routes.map(
    (item) => {
      if (item.method == "PUT" && item.path == "/users/:id") {
        if (typeof item.config.middlewares === "undefined") {
          item.config.middlewares = ["global::its-me"];
        } else {
          item.config.middlewares.push("global::its-me");
        }
      }
      return item;
    }
  );
  return plugin;
};
