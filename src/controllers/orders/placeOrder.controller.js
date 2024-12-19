/*
Created By : Omkar Sharma
Description  : Place order.
Last Modified Date : 20-December-2024
*/
const mongoose = require("mongoose");
const { successResponse, errorResponse } = require("../../helpers/common");
const Product = require("../../models/product");
const Order = require("../../models/order");
const { systemLogs } = require("../../helpers/logger");

module.exports.placeOrder = async (req, res) => {
  const productData = await Product.findOne({
    _id: req.body.productId,
    stock: { $gte: req.body.quantity },
  });
  if (!productData) {
    return successResponse(req, res, "Product not found or stock is insufficient.", {});
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Create the order
    await Order.create(
      [
        {
          userId: req.user._id,
          productId: req.body.productId,
        },
      ],
      { session }
    );

    // Step 2: Decrement the stock
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.productId },
      { $inc: { stock:  req.body.quantity} },
      { new: true, session }
    );

    if (!updatedProduct) {
      throw new Error(
        "Failed to decrement stock. Product not found or stock already insufficient."
      );
    }

    // Commit the transaction if both operations succeed
    await session.commitTransaction();
    session.endSession();
    return successResponse(req, res, "Order created and stock updated successfully!", {});
  } catch (error) {
    // Rollback the transaction if any operation fails
    await systemLogs(req, "ERROR", `API-placeOrder: ${error.message}`);
    await session.abortTransaction();
    session.endSession();
    return errorResponse(req, res, error.message);
  }
};

