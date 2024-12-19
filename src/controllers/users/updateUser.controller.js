const bcrypt = require('bcrypt');
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const { passwordValidation } = require("./users.utils");
const User = require('../../models/users');
module.exports.updateUser = async (req, res) => {
  try {

    const userData = await User.findOne(
      {
        isActive: true,
        _id: req.user._id,
      },
      { _id: 1, role: 1 }
    );
    if (!userData) {
      return successResponse(req, res, "Invalid User!.", 400);
    }
    if (req?.body?.password && !(await passwordValidation(req?.body?.password))) {
      return successResponse(
        req,
        res,
        "Password does not meet the criteria.",
        {},
        400
      );
    }
    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        password: req.body.password? await bcrypt.hash(req.body.password, 10): undefined,
        name: req?.body?.name,
        role: req?.body?.role,
        lastModifiedDate: new Date(),
      }
    );
    return successResponse(
      req,
      res,
      "Data updated successfully.",
      {},
      200
    );
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-updateUser: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
