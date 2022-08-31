import Joi from "joi";

export const battleSchema = Joi.object({
  firstUser: Joi.string().required(),
  secondUser: Joi.string().required(),
});
