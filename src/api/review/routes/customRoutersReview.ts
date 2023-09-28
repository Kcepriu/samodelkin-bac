export default {
  routes: [
    {
      method: "PUT",
      path: "/replyToReview/:id",
      handler: "review.replyToReview",
      config: {
        middlewares: ["api::review.review-info"],
      },
    },
    {
      method: "PUT",
      path: "/changeStatusReview/:id",
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
      path: "/changeStatusReplyToReview/:id/:idReply",
      handler: "review.changeStatusReplyToReview",
      config: {
        middlewares: [
          "api::review.review-info",
          "api::review.validation-change-status-review",
        ],
      },
    },
  ],
};
