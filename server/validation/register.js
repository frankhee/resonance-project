const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
// Name checks
  if(Validator.isEmpty(data.firstname)) {
    errors.new_firstname = "First name field is required";
  }
  if(Validator.isEmpty(data.lastname)) {
    errors.new_lastname = "Last name field is required";
  }
// Email checks
  if(Validator.isEmpty(data.email)) {
    errors.new_email = "Email field is required";
  } else if(!Validator.isEmail(data.email)) {
    errors.new_email = "Email is invalid";
  }
  // Username checks
  if(Validator.isEmpty(data.username)) {
    errors.new_username = "Username field is required";
  }
  // Password checks
  if(Validator.isEmpty(data.password)) {
    errors.new_password = "Password field is required";
  }
if(Validator.isEmpty(data.confirmPassword)) {
    errors.new_confirmPassword = "Confirm password field is required";
  }
if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.new_password = "Password must be at least 6 characters";
  }
if(!Validator.equals(data.password, data.confirmPassword)) {
    errors.new_confirmPassword = "Passwords must match";
  }
return{
    errors,
    isValid: isEmpty(errors)
  };
};