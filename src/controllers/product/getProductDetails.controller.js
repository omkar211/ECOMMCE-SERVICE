const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Product = require("../../models/product");

module.exports.getProductDetails = async (req, res) => {
  try {
    const returnData = await Product.findOne({
      _id: req.body.productId,
      isActive: true,
    });

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
    await systemLogs(req, "ERROR", `API-loginUser: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
