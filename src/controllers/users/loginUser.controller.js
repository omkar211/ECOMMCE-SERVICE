/*
Created By : Omkar Sharma
Description  : login user.
Last Modified Date : 20-December-2024
*/
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse , successResponseWithKeys} = require("../../helpers/common");
const { SECRET_KEY } = require("../../../config")
const User = require("../../models/users");
const { systemLogs } = require("../../helpers/logger");

module.exports.loginUser = async (req, res) => {
  try {
    const userData = await User.findOne(
      {
        email: req.body.email,
        isActive: true,
      },
      { _id: 1, role: 1, password: 1 }
    );
    if (!userData) {
      return successResponse(req, res, "Authentication failed", 401);
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!passwordMatch) {
      return successResponse(req, res, "Authentication failed", 401);
    }

    const token =  jwt.sign(
      {
        _id: userData._id,
        role: userData.role,
      },
      SECRET_KEY,
      { expiresIn: "10h" }
    );
    return successResponseWithKeys(req, res, 200, "User login successfully", { token });
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-loginUser: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
