const express = require("express");
const session = require("express-session");
const passport = require("passport").Passport,
  userpassport = new passport(),
  adminpassport = new passport();
const cookieParer = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleWare = require("./middlewares/error");

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const admin = require("./routes/adminRoute");
const order = require("./routes/orderRoute");
const Admin = require("./models/adminModel");
const User = require("./models/userModel");

const app = express();
app.use(express.json());
app.use(cookieParer());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  session({
    secret: "This is little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(adminpassport.initialize());
app.use(adminpassport.session());
adminpassport.use(Admin.createStrategy("local"));
adminpassport.serializeUser((admin, done) => {
  done(null, admin);
});
adminpassport.deserializeUser((admin, done) => {
  done(null, admin);
});

app.use(userpassport.initialize());
app.use(userpassport.session());
userpassport.use(User.createStrategy("local"));
userpassport.serializeUser((user, done) => {
  done(null, user);
});
userpassport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/api", product);
app.use("/api", order);
app.use("/api/user", user);
app.use("/api/admin", admin);

// Error MiddleWare
app.use(errorMiddleWare);

module.exports = app;
