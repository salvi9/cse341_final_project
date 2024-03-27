const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("customers")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }
  const customerId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("final_project")
    .collection("customers")
    .find({ _id: customerId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postCustomer = async (req, res) => {
  try {
    const customer = {
      name: req.body.name,
      movie: req.body.movie,
      seat: req.body.seat,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("customers")
      .insertOne(customer);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while posting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putCustomer = async (req, res) => {
  try {
    const customerId = new ObjectId(req.params.id);
    const customer = {
      name: req.body.name,
      movie: req.body.movie,
      seat: req.body.seat,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("customers")
      .replaceOne({ _id: customerId }, customer);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("customers")
      .deleteOne({ _id: customerId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    console.error("Error while deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postCustomer,
  putCustomer,
  deleteCustomer,
};
