const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("employees")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }
  const employeeId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("final_project")
    .collection("employees")
    .find({ _id: employeeId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postEmployee = async (req, res) => {
  try {
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      date_of_birth: req.body.date_of_birth,
      language: req.body.language,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("employees")
      .insertOne(employee);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while posting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putEmployee = async (req, res) => {
  try {
    const employeeId = new ObjectId(req.params.id);
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      date_of_birth: req.body.date_of_birth,
      language: req.body.language,
    };
    const response = await mongodb
      .getDb()
      .db("final_project")
      .collection("employees")
      .replaceOne({ _id: employeeId }, employee);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error("Error while updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("final_project")
      .collection("employees")
      .deleteOne({ _id: employeeId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    console.error("Error while deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postEmployee,
  putEmployee,
  deleteEmployee,
};
