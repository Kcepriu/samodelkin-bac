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
  ],
};
