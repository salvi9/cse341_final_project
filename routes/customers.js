const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customers");
const validation = require("../middleware/validate");

router.get("/", customerController.getAll);

router.get("/:id", customerController.getSingle);

router.post("/", validation.saveCustomers, customerController.postCustomer);

router.put("/:id", validation.saveCustomers, customerController.putCustomer);

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
