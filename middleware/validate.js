const validator = require("../helpers/validate");

const saveEmployee = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    username: "required|string",
    password: "required|string",
    date_of_birth: "string",
    language: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveCustomers = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    movie: "required|string",
    seat: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveMovies = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    genre: "required|string",
    release_date: "required|string",
    rating: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveSnacks = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    description: "required|string",
    price: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveEmployee,
  saveCustomers,
  saveMovies,
  saveSnacks,
};
