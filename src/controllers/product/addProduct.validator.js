const {Joi } = require("express-validation")

module.exports.addProductValidation={
    body: Joi.object({
        stock: Joi.number().required(),
        price: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
    })
}
