export default {
  routes: [
    {
      method: "GET",
      path: "/lastReviews",
      handler: "review.lastReviews",
      config: {
        middlewares: ["api::review.review-info"],
      },
    },
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
      path: "/changeReplyToReview/:id/:idReply",
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
