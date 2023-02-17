const mongoose = require("mongoose");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  username: {
    type: String,
    required: [true, "Please enter your Email"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [8, "Password should be greater than 8 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "Admin",
  },
  shopName: {
    type: String,
    required: true,
  },
  gstNo: {
    type: String,
    required: true,
    minlength: [15, "GST Number can not be less than 15 characters"],
    maxlength: [15, "GST Number can not be exceed 15 characters"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

adminSchema.methods.getResetPasswordToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding to adminSchema
  this.resetPasswordToken = crypto
    .createHash("RSA-SHA256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

adminSchema.plugin(passportLocalMongoose);

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
