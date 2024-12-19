const {Joi } = require("express-validation")

module.exports.updateProductValidation={
    body: Joi.object({
        productId: Joi.string().required(),
        stock: Joi.number().optional(),
        price: Joi.number().optional(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
    })
}
