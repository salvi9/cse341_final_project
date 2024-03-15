const express = require("express");
const router = express.Router();

router.use("/employee", require("./employee"));
router.use("/", require("./swagger"));

module.exports = router;
