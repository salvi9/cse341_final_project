const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee");
// const validation = require("../middleware/validate");

router.get("/", employeeController.getAll);

router.get("/:id", employeeController.getSingle);

router.post("/", employeeController.postUser);

router.put("/:id", employeeController.putUser);

router.delete("/:id", employeeController.deleteUser);

module.exports = router;
