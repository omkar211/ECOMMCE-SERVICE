/*
Created By : Omkar Sharma
Description  : Get user detail.
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const User = require("../../models/users");

module.exports.getUserDetails = async (req, res) => {
  try {
    const returnData = await User.findOne(
      {
        _id: req.user._id,
      },
      { password: 0, role: 0 }
    );
    
    if (!returnData) {
      return successResponse(req, res, "No data present.", 200);
    }
    return successResponse(req, res, "User login successfully", returnData);
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-getUserDetails: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
