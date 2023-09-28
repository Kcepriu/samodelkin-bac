import Joi from "joi";

export const schemaChangeStatusReview = Joi.object({
  isPublication: Joi.boolean().required(),
});
