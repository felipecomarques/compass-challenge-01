import Joi from "joi";

const petSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  carry: Joi.string().required(),
  weight: Joi.number().required(),
  date_of_birth: Joi.string().required(),
  id: Joi.number().integer().required(),
});

export default petSchema;
