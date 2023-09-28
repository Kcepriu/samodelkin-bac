import Joi from "joi";

export const schemaChangeStatusReview = Joi.object({
  isPublication: Joi.boolean().required(),
});

export const schemaChangeReplyToReview = Joi.object({
  isPublication: Joi.boolean().required(),
  content: Joi.string(),
});
