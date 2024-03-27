const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/customers", require("./customers"));
router.use("/employees", require("./employees"));
router.use("/movies", require("./movies"));
router.use("/snacks", require("./snacks"));

module.exports = router;
