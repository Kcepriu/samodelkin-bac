export default {
  routes: [
    {
      method: "GET",
      path: "/last-reviews",
      handler: "review.lastReviews",
      config: {
        middlewares: ["api::review.review-info"],
      },
    },
    {
      method: "GET",
      path: "/get-info-product-review/:productId",
      handler: "review.getInfoProductReview",
      config: {
        middlewares: ["api::review.review-info"],
      },
    },
    {
      method: "PUT",
      path: "/reply-to-review/:id",
      handler: "review.replyToReview",
      config: {
        middlewares: ["api::review.review-info"],
      },
    },
    {
      method: "PUT",
      path: "/change-status-review/:id",
      handler: "review.changeStatusReview",
      config: {
        middlewares: [
          "api::review.review-info",
          "api::review.validation-change-status-review",
        ],
      },
    },
    {
      method: "PUT",
      path: "/change-reply-to-review/:id/:idReply",
      handler: "review.changeReplyToReview",
      config: {
        middlewares: [
          "api::review.review-info",
          "api::review.validation-change-reply-to-review",
        ],
      },
    },
  ],
};
