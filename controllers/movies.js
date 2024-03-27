const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("movies")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a movies.");
  }
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("final_project")
    .collection("movies")
    .find({ _id: movieId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      genre: req.body.genre,
      release_date: req.body.release_date,
      rating: req.body.rating,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("movies")
      .insertOne(movie);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while posting movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      genre: req.body.genre,
      release_date: req.body.release_date,
      rating: req.body.rating,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("movies")
      .replaceOne({ _id: movieId }, movie);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while updating movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("movies")
      .deleteOne({ _id: movieId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    console.error("Error while deleting movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postMovie,
  putMovie,
  deleteMovie,
};
