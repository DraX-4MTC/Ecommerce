const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  reviewProduct,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const {
  isAuthenticatedAdmin,
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middlewares/auth");

const router = express.Router();

router.get("/products", getAllProducts);
router.post(
  "/admin/createProduct",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  createProduct
);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedAdmin, authorizeRoles("Admin"), updateProduct)
  .delete(isAuthenticatedAdmin, authorizeRoles("Admin"), deleteProduct);

router.get("/product/:id", getSingleProduct);
router.put("/product/createUpdateReview", isAuthenticatedUser, reviewProduct);
router.get("/product/getReviews", getAllReviews);
router.delete(
  "/product/deleteReview",
  isAuthenticatedAdmin,
  authorizeRoles("Admin"),
  deleteReview
);

module.exports = router;
