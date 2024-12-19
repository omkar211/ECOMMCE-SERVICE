const mongoose = require('mongoose');
require("dotenv").config()

module.exports.init = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI);
  if (db.connection) {
    console.log(`Database connected`);
  } else {
    console.error(`Database connection failed`);
  }
};
