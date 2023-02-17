const express = require("express");
const router = express.Router();

const {
  createOrder,
  singleOrder,
  userOrder,
  adminOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middlewares/auth");

router.post("/createOrder", isAuthenticatedUser, createOrder);
router.get("/getSingleOrder/:id", isAuthenticatedUser, singleOrder);
router.get("/myOrders", isAuthenticatedUser, userOrder);
router.get(
  "/orders",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  adminOrders
);
router.put(
  "/updateOrders/:id",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  updateOrderStatus
);
router.delete(
  "/deleteOrder/:id",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  deleteOrder
);

module.exports = router;
