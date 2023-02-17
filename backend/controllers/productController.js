const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Products -- Admin
const createProduct = asyncErrorHandler(async (req, res, next) => {
  req.body.user = req.admin.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get Single Product
const getSingleProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    return res.status(201).json({
      success: true,
      product,
    });
  }
});

// Update Product -- Admin
const updateProduct = asyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }
});

//Delete Product -- Admin
const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    await product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  }
});

// Create Review or Update Review
const reviewProduct = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productID } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productID);

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        (review.rating = rating), (review.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a particular product
const getAllReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
});

// Delete Review of a particular product
const deleteReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;
    let ratings;
    let numOfReviews;

    if (reviews.length == 0) {
      ratings = 0;
      numOfReviews = 0;
    } else {
      reviews.forEach((review) => {
        console.log(review);
        avg += review.rating;
      });

      ratings = avg / reviews.length;

      numOfReviews = reviews.length;
    }

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  }
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  reviewProduct,
  getAllReviews,
  deleteReview,
};
