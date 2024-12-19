const {Joi } = require("express-validation")

module.exports.getProductDetailsValidation={
    body: Joi.object({
        productId: Joi.string().required(),
    })
}
