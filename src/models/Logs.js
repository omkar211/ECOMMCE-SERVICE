const mongoose = require("mongoose")

const logsSchema = mongoose.Schema({
  requestUrl: {
    type: String,
  },
  requestPayload: {
    type: Object,
  },
  response: {
    type: String,
  },
  logLevel: {
    type: String,
  },
  externalEndPoint: {
    type: String,
  },
  processBy: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  createdBy: {
    type: String,
  },
})

module.exports.Logs = mongoose.model("Logs", logsSchema)
