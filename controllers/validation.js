// Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    bar: Joi.string().required()
  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
