const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

const connectDB = require("./config/db");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server shutting down due to uncaught exception.");
  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/.env" });

// Connecting to Database
connectDB();

// Connecting Cloud for Images
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

// Unhandled Promise Rejection Error Handling
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
