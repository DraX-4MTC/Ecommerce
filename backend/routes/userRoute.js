const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUser,
  getAllUser,
  getSingleUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logoutUser", logoutUser);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/changeUserPassword", isAuthenticatedUser, changePassword);
router.put("/changeUserDetails", isAuthenticatedUser, updateUser);

module.exports = router;
