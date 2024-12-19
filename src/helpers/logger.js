const { Logs } = require("../models/Logs");
module.exports.systemLogs = async (
  req,
  logLevel,
  errResponse,
  externalEndPoint = null
) => {
  try {
    await Logs.create({
      requestUrl: req?.originalUrl,
      requestPayload: req?.body,
      response: errResponse,
      externalEndPoint: externalEndPoint,
      logLevel: logLevel,
      processBy: "E-commerce-V1 PROCESS",
      createdDate: new Date(),
      createdBy: req?.user?._id,
    });
    return true;
  } catch (Error) {
    console.log(Error);
    return false;
  }
};
