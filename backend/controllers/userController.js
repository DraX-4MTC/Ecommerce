const passport = require("passport").Passport,
  userpassport = new passport();
const crypto = require("crypto");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

userpassport.use(User.createStrategy("local"));
userpassport.serializeUser((user, done) => {
  done(null, user);
});
userpassport.deserializeUser((user, done) => {
  done(null, user);
});

// Register User
const registerUser = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "userAvatar",
    width: 150,
    crop: "scale",
  });

  const { name, username, password } = req.body;

  if (password.length < 8) {
    return next(
      new ErrorHandler("Password must be greater than 8 characters", 400)
    );
  } else {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return next(
        new ErrorHandler(
          "User with same email address already exists. Kindly choose another email address",
          400
        )
      );
    }
    const user = await User.register(
      {
        name,
        username,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      },
      password
    );

    if (user) {
      const details = await User.findOne({ username });
      return sendToken(details, 201, res);
    }
  }
};

// Login User
const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  } else {
    const user = new User({
      username,
      password,
    });

    const details = await User.findOne({ username });

    req.login(user, (err) => {
      if (!err) {
        userpassport.authenticate("local")(req, res, () => {
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

// LogOut User
const logoutUser = asyncErrorHandler(async (req, res, next) => {
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
  const user = await User.findOne({ username: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  } else {
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/api/user/password/reset/${resetToken}`;

    const message = `Your password reset link is: \n\n ${resetPasswordURL} \n\nThis link is valid only for 15 mins. \n\nIf you have not asked for this mail, then kindly ignore `;

    try {
      await sendEmail({
        email: user.username,
        subject: "Ecommerce Password Recovery",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.username}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      console.log(error);

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

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
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
      await User.findByUsername(user.username).then((sanitizedUser) => {
        if (sanitizedUser) {
          sanitizedUser.setPassword(req.body.confirmPassword, async () => {
            await sanitizedUser.save();
            sendToken(user, 200, res);
            console.log("Password changed succesfully");
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
          });
        } else {
          console.log("Password did not changed");
        }
      });
    }
  }
});

// Get User Details
const getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Change Password
const changePassword = asyncErrorHandler(async (req, res, next) => {
  const userID = req.user.id;

  if (!userID) {
    return next(
      new ErrorHandler("Some error occured, try again after some time", 400)
    );
  } else {
    const user = await User.findById(userID);

    if (!user) {
      return next(new ErrorHandler("User not found!!", 400));
    } else {
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      } else {
        user.changePassword(
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
        sendToken(user, 200, res);
      }
    }
  }
});

// Update User
const updateUser = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    username: req.body.username,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    returnValidators: true,
    useFindAndModify: false,
  });

  if (user) {
    res.status(200).json({
      success: true,
      user,
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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUser,
};
