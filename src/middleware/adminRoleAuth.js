const { successResponse, errorResponse } = require("../helpers/common");

module.exports.adminRoleAuth = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return successResponse(req, res, "Invalid Operation", 400);
    }
    return next();
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-apiAuth: ${Error}`)
    return errorResponse(req, res, Error.message);
  }
};
