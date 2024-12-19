/*
Created By : Omkar Sharma
Description  : Get all products.
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Product = require("../../models/product");

module.exports.getAllProduct = async (req, res) => {
  try {
    const page = req?.body?.page || 1;
    const limit = Math.min(req?.body?.limit || 20, 50);
    const offset = (page - 1) * limit;

    const returnData = await Product.find(
      {isActive: true},
      { _id: 0, name: 1, price: 1, stock: 1 }
    )
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!returnData) {
      return successResponse(req, res, "No product present.", []);
    }
    return successResponse(req, res, "Products fetch successfully", returnData);
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-getAllProduct: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
