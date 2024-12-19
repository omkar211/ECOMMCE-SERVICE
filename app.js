const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const apiRoutes = require("./src/routes");
const { apiAuth } = require("./src/middleware/apiAuth");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();
require('./db').init()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());

app.use("/api", apiAuth, apiRoutes);

app.use(errorHandler)
// catch 404 and forward to error handler


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
