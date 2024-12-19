const {Joi } = require("express-validation")

module.exports.deleteProductValidation={
    body: Joi.object({
        productId: Joi.string().required(),
    })
}
