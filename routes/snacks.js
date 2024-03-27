const express = require("express");
const router = express.Router();

const snackController = require("../controllers/snacks");
const validation = require("../middleware/validate");

router.get("/", snackController.getAll);

router.get("/:id", snackController.getSingle);

router.post("/", validation.saveSnacks, snackController.postSnack);

router.put("/:id", validation.saveSnacks, snackController.putSnack);

router.delete("/:id", validation.saveSnacks, snackController.deleteSnack);

module.exports = router;
