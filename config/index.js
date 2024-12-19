require("dotenv").config()
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT || 9000,
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_URI: process.env.MONGO_URI,
}
