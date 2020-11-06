const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.identifier = !isEmpty(data.identifier) ? data.identifier : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.identifier)) {
    errors.email = "Email or username field is required";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};