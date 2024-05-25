const express = require("express");
const routerCustomer = require("./api/customers/routes");
const routerAuth = require("./api/auth/routes");
const { initializeDatabase } = require("./database");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const passport = require("passport");
const { passportLocal, passportJwt } = require("./middlewares/passport");

// middlewares before
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
passport.use("localStrategy", passportLocal);
passport.use("jwt", passportJwt);

// actual routes
app.use(passport.authenticate("jwt", { session: false }), routerCustomer);
app.use(routerAuth);

// middlewares after
// error
app.use((err, req, res, next) => {
  res.status(500).json({ message: "something wrong happend", err });
});
// notfound!
app.use((req, res, next) => {
  res.status(404).json({ message: "this path is not found!" });
});

initializeDatabase()
  .then(() => {
    app.listen(5001, () => {
      console.log("Server is running in port 5000");
    });
  })
  .catch((error) => {
    console.log("Database initialization failed ;( because:", error);
  });
