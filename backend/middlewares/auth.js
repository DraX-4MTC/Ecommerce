const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

const Admin = require("../models/adminModel");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  }
});

const isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please LogIn to access this resource", 401));
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decodedData.id);

    next();
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (
      req.admin == null ||
      !roles.includes(req.admin.role) ||
      !roles.includes(req.user.role)
    ) {
      return next(
        new ErrorHandler("You are not allowed to access this resource..", 403)
      );
    } else {
      next();
    }
  };
};

module.exports = { isAuthenticatedAdmin, authorizeRoles, isAuthenticatedUser };
