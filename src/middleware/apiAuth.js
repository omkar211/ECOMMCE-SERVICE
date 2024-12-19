const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { systemLogs } = require("../helpers/logger");
module.exports.apiAuth = async (req, res, next) => {
  if (
    ["/api/health", "/api/createUser", "/api/login"].includes(req.originalUrl)
  )
    return next();

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid." });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (Error) {
    await systemLogs(req, "ERROR", `API-apiAuth: ${Error}`)
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
