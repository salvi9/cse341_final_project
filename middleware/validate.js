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

/* const saveProducts = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    price: "required|string",
    category: "required|string",
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
}; */

module.exports = {
  saveEmployee,
};
