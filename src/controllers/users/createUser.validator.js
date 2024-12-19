const {Joi } = require("express-validation")

module.exports.createUserValidation={
    body: Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
    })
}