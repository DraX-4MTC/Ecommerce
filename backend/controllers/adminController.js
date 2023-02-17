const passport = require("passport").Passport,
  adminpassport = new passport();
const crypto = require("crypto");

const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middlewares/catchAsyncError");
const Admin = require("../models/adminModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

adminpassport.use(Admin.createStrategy("local"));
adminpassport.serializeUser((admin, done) => {
  done(null, admin);
});
adminpassport.deserializeUser((admin, done) => {
  done(null, admin);
});

// Register Admin
const registerAdmin = async (req, res, next) => {
  const { name, username, password, shopName, gstNo } = req.body;

  if (password.length < 8) {
    return next(
      new ErrorHandler("Password must be greater than 8 characters", 400)
    );
  } else {
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      return next(
        new ErrorHandler(
          "User with same email address already exists. Kindly choose another email address",
          400
        )
      );
    }
    const admin = await Admin.register(
      {
        name,
        username,
        avatar: {
          public_id: "this is sample id",
          url: "profilepicurl",
        },
        shopName,
        gstNo,
      },
      password
    );

    if (admin) {
      const details = await Admin.findOne({ username });
      return sendToken(details, 201, res);
    }
  }
};

// Login Admin
const loginAdmin = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  } else {
    const admin = new Admin({
      username,
      password,
    });

    const details = await Admin.findOne({ username });

    req.login(admin, (err) => {
      if (!err) {
        adminpassport.authenticate("local")(req, res, () => {
          console.log("Log In Successfully");
          sendToken(details, 200, res);
        });
      } else {
        console.log(err);
        return next(
          new ErrorHandler("Invalid Email or Password, please try again", 400)
        );
      }
    });
  }
});

// LogOut Admin
const logoutAdmin = asyncErrorHandler(async (req, res, next) => {
  req.logout();

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot Password
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const admin = await Admin.findOne({ username: req.body.email });

  if (!admin) {
    return next(new ErrorHandler("User not found", 404));
  } else {
    const resetToken = admin.getResetPasswordToken();

    await admin.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/api/admin/password/reset/${resetToken}`;

    const message = `Your password reset link is: \n\n ${resetPasswordURL} \n\nThis link is valid only for 15 mins. \n\nIf you have not asked for this mail, then kindly ignore `;

    try {
      await sendEmail({
        email: admin.username,
        subject: "Ecommerce Password Recovery",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${admin.username}`,
      });
    } catch (error) {
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpire = undefined;

      await admin.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }
});

// Reset passsword
const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("RSA-SHA256")
    .update(req.params.token)
    .digest("hex");

  const admin = await Admin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!admin) {
    return next(
      new ErrorHandler(
        "Reset password link is invalid or has been expired",
        400
      )
    );
  } else {
    if (req.body.password != req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    } else {
      await Admin.findByUsername(admin.username).then((sanitizedAdmin) => {
        if (sanitizedAdmin) {
          sanitizedAdmin.setPassword(req.body.confirmPassword, async () => {
            await sanitizedAdmin.save();
            sendToken(admin, 200, res);
            console.log("Password changed succesfully");
          });
        } else {
          console.log("Password did not changed");
        }
      });
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpire = undefined;
    }
  }
});

// Get Admin details
const getAdminDetails = asyncErrorHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);

  res.status(200).json({
    success: true,
    admin,
  });
});

// Change Password
const changePassword = asyncErrorHandler(async (req, res, next) => {
  const adminID = req.admin.id;

  if (!adminID) {
    return next(
      new ErrorHandler("Some error occured, try again after some time", 400)
    );
  } else {
    const admin = await Admin.findById(adminID);

    if (!admin) {
      return next(new ErrorHandler("Admin not found!!", 400));
    } else {
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      } else {
        admin.changePassword(
          req.body.oldPassword,
          req.body.confirmPassword,
          (err) => {
            if (err) {
              if (err.name === "IncorrectPasswordError") {
                return next(new ErrorHandler("Incorrect Password", 400));
                console.log(err);
              } else {
                return next(
                  new ErrorHandler(
                    "Some Error occured, Please try again after some time",
                    400
                  )
                );
                console.log(err);
              }
            } else {
              user.save();
              console.log("Password changed succesfully");
            }
          }
        );
        sendToken(admin, 200, res);
      }
    }
  }
});

// Update Admin
const updateAdmin = asyncErrorHandler(async (req, res, next) => {
  const newAdminData = {
    name: req.body.name,
    username: req.body.username,
  };

  const admin = await Admin.findByIdAndUpdate(req.admin.id, newAdminData, {
    new: true,
    returnValidators: true,
    useFindAndModify: false,
  });

  if (admin) {
    res.status(200).json({
      success: true,
      admin,
    });
  } else {
    return next(
      new ErrorHandler(
        "Unable to update Profile. Please try again after some time",
        400
      )
    );
  }
});

// Get all Users (Admin)
const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User (Admin)
const getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  forgotPassword,
  resetPassword,
  getAdminDetails,
  changePassword,
  updateAdmin,
  getAllUser,
  getSingleUser,
};
