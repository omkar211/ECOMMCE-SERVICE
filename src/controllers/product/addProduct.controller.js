const { successResponse, errorResponse } = require("../../helpers/common");
const { systemLogs } = require("../../helpers/logger");
const Product = require("../../models/product");

module.exports.addProduct = async (req, res) => {
  try {
    // Insert in collection
    let returnData = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
    });
    return successResponse(req, res, "Product added successfully!", returnData);
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-addProduct: ${Error}`);
    return errorResponse(req, res, Error.message);
  }
};
