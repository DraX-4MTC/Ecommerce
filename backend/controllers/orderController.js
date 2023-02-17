const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middlewares/catchAsyncError");

// Create Order
const createOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Single Order Details
const singleOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name username"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id number: ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({
      success: true,
      order,
    });
  }
});

// Get Logged In User Orders
const userOrder = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders for Admin
const adminOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
};

// Update Order stauts (Admin)
const updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id ${req.params.id}`, 404)
    );
  } else {
    if (order.orderStatus === "Delivered") {
      return next(
        new ErrorHandler("You have already delievered this order.", 404)
      );
    } else {
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered" || req.body.status === "delivered") {
        order.deliveredAt = Date.now();
        order.orderItems.forEach(async (orderItem) => {
          await updateStock(orderItem.product, orderItem.quantity);
        });
      } else if (
        req.body.status === "Shipped" ||
        req.body.status === "shipped"
      ) {
        order.shippedAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
      });
    }
  }
});

// Delete Order
const deleteOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createOrder,
  singleOrder,
  userOrder,
  adminOrders,
  updateOrderStatus,
  deleteOrder,
};
