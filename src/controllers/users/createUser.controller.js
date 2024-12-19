const { successResponse, errorResponse } = require("../../helpers/common");
const bcrypt = require('bcrypt');
const User = require("../../models/users");
const { passwordValidation } = require("./users.utils");
const { systemLogs } = require("../../helpers/logger");
module.exports.createUser = async (req, res) => {
  try {
    if (
      await User.findOne(
        {
          email: req?.body?.email,
        },
        { _id: 1 }
      )
    ) {
      return successResponse(req, res, "Email already exist.", 400);
    }
    if (!(await passwordValidation(req.body.password))) {
      return successResponse(
        req,
        res,
        "Password does not meet the criteria.",
        {},
        400
      );
    }
    // Insert in collection
    let returnData = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10)
    });
    return successResponse(req, res, "User created successfully!", returnData);
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-createUser: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
