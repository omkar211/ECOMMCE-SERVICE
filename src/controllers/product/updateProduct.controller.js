/*
Created By : Omkar Sharma
Description  : Update the product details
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Product = require("../../models/product");

module.exports.updateProduct = async (req, res) => {
    const payload = req?.body
  try {
    const returnData = await Product.updateOne(
      {
        _id: req.body.productId,
      },
      {
        name: payload?.name,
        price: payload?.price,
        stock: payload?.stock,
        description: payload?.description,
        isActive: payload?.isActive,
      }
    );

    if (!returnData) {
      return successResponse(req, res, "No data present.", {});
    }
    return successResponse(req, res, "Product updated.", {});
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-updateProduct: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
