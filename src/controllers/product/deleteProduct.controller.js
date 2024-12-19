/*
Created By : Omkar Sharma
Description  : Delete the product (soft delete).
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Product = require("../../models/product");

module.exports.deleteProduct = async (req, res) => {
  try {
    const returnData = await Product.updateOne(
      {
        _id: req.body.productId,
      },
      {
        isActive: false,
      }
    );

    if (!returnData) {
      return successResponse(req, res, "No data present.", {});
    }
    return successResponse(req, res, "Product deleted.", {});
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-deleteProduct: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
