const { ValidationError } = require("express-validation");
const { errorResponse } = require("../helpers/common");

module.exports.errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return errorResponse(
      req,
      res,
      err.error || err.message,
      err.statusCode,
      err
    );
  }
  if (err && err.message === "validation error") {
    let messages = err.errors.map((e) => e.field);
    if (messages.length && messages.length > 1) {
      messages = `${messages.join(", ")} are required fields`;
    } else {
      messages = `${messages.join(", ")} is required field`;
    }
    return errorResponse(req, res, messages, 400, err);
  }
  return errorResponse(req, res, "Something went wrong", 400, err);
};