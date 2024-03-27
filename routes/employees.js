const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employees");
const validation = require("../middleware/validate");

router.get("/", employeeController.getAll);

router.get("/:id", employeeController.getSingle);

router.post("/", validation.saveEmployee, employeeController.postEmployee);

router.put("/:id", validation.saveEmployee, employeeController.putEmployee);

router.delete(
  "/:id",
  validation.saveEmployee,
  employeeController.deleteEmployee
);

module.exports = router;
