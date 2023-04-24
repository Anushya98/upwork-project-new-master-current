const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const dotenv = require("dotenv"),
  path = require("path");
dotenv.config({ path: path.join(__dirname, "../config./config.env") });

function extractToken(req) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}
// Protect routes
exports.protect = async (req, res, next) => {
  try {
    const token = extractToken(req);
    console.log(token);
    if (token === "null" || token === null) {
      return next(
        new ErrorResponse("Login first to access this resource.", 401)
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    console.log(error);
  }
  next();
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
