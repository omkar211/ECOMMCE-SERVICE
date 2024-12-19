const { Joi } = require("express-validation");

module.exports.placeOrderValidation = {
  body: Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required().messages({
      'number.base': 'Quantity must be a number.',
      'number.min': 'Quantity must be greater than 1.',
      'any.required': 'Quantity is required.',
    }),
  }),
};
