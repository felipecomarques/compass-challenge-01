import Joi from "joi";

const tutorSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  date_of_birth: Joi.string().required(),
  zip_code: Joi.string().required(),
  pets: Joi.array().items(
    Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().required(),
      species: Joi.string().required(),
      carry: Joi.string().required(),
      weight: Joi.number().required(),
      date_of_birth: Joi.string().required(),
    })
  ),
});

export default tutorSchema;
