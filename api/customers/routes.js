const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  getOneCustomer,
} = require("./controllers");

router.get("/customers", getAllCustomers);
router.post("/customers/", addNewCustomer);
router.put("/customers/:id", updateCustomer);
router.get("/customers/:id", getOneCustomer);

module.exports = router;
