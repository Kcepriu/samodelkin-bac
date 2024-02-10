export default {
  routes: [
    {
      method: "POST",
      path: "/products-by-list",
      handler: "product.getProductsByList",
      config: {
        middlewares: ["api::product.product-info"],
      },
    },
    {
      method: "GET",
      path: "/filters/:categories",
      handler: "product.getFilters",
    },

    {
      method: "GET",
      path: "/filters",
      handler: "product.getFilters",
    },
  ],
};
