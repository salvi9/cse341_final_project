const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("snacks")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching snacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a snacks.");
  }
  const snackId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("final_project")
    .collection("snacks")
    .find({ _id: snackId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postSnack = async (req, res) => {
  try {
    const snack = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("snacks")
      .insertOne(snack);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while posting snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putSnack = async (req, res) => {
  try {
    const snackId = new ObjectId(req.params.id);
    const snack = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("snacks")
      .replaceOne({ _id: snackId }, snack);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while updating snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSnack = async (req, res) => {
  try {
    const snackId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("snacks")
      .deleteOne({ _id: snackId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    console.error("Error while deleting snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postSnack,
  putSnack,
  deleteSnack,
};
