const {Joi } = require("express-validation")

module.exports.updateUserValidation={
    body: Joi.object({
        name: Joi.string().optional(),
        role: Joi.string().optional(),
        password: Joi.string().optional(),
    })
}