const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/adminController");
const { isAuthenticatedAdmin, authorizeRoles } = require("../middlewares/auth");

router.post("/registerAdmin", registerAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logoutAdmin", logoutAdmin);
router.get("/me", isAuthenticatedAdmin, getAdminDetails);
router.put("/changeAdminPassword", isAuthenticatedAdmin, changePassword);
router.put("/changeAdminDetails", isAuthenticatedAdmin, updateAdmin);
router.get("/users", isAuthenticatedAdmin, authorizeRoles("Admin"), getAllUser);
router.get(
  "/user/:id",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  getSingleUser
);

module.exports = router;
