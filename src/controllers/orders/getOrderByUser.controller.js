/*
Created By : Omkar Sharma
Description  : Get all the orders for a user.
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Order = require("../../models/order");

module.exports.getOrderByUser = async (req, res) => {
  try {
    const page = req?.body?.page || 1;
    const limit = Math.min(req?.body?.limit || 20, 50);
    const offset = (page - 1) * limit;

    const returnData = await Order.find({
      userId: req.user._id,
    })
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });


    if (!returnData) {
      return successResponse(req, res, "No product present.", null);
    }
    return successResponse(
      req,
      res,
      "Product details fetch successfully",
      returnData
    );
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-getOrderByUser: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
