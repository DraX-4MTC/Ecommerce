const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is compulsory"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is necessary"],
  },
  price: {
    type: Number,
    required: [true, "Product Price is must"],
    maxlength: [6, "Price can not exceed 6 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Please provide the category of your product"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    maxlength: [4, "Stock can not be more than 10000 items"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
