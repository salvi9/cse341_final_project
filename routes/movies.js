const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movies");
const validation = require("../middleware/validate");

router.get("/", movieController.getAll);

router.get("/:id", movieController.getSingle);

router.post("/", validation.saveMovies, movieController.postMovie);

router.put("/:id", validation.saveMovies, movieController.putMovie);

router.delete("/:id", movieController.deleteMovie);

module.exports = router;
