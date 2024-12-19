/*
Created By : Omkar Sharma
Description  : Server health check.
Last Modified Date : 20-December-2024
*/
const { successResponse, errorResponse } = require("../../helpers/common");

module.exports.health = async (req, res) => {
  try {
    return successResponse(req, res, "OK", {
      uptime: process.uptime(),
      message: "Ok",
      date: new Date(),
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};