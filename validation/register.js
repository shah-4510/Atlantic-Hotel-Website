const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistration(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.pwd = !isEmpty(data.pwd) ? data.pwd : "";
  data.confPwd = !isEmpty(data.confPwd) ? data.confPwd : "";

  if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = "Name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.pwd)) {
    errors.pwd = "Password field is required";
  }

  if (!Validator.isLength(data.pwd, { min: 6, max: 40 })) {
    errors.pwd = "Password must be atleast 6 characters";
  }

  if (Validator.isEmpty(data.confPwd)) {
    errors.confPwd = "Confirm Password field is required";
  }

  if (!Validator.equals(data.pwd, data.confPwd)) {
    errors.confPwd = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
