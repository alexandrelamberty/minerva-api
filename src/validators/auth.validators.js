const yup = require("yup");

/**
 * Module for validating user registration and login data using Yup.
 * @module validators/authValidators
 * @requires yup
 */

// Regular expression to check against password
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

/**
 * Validation schema for user registration.
 */
const registerValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  password: yup.string().required().min(8).matches(passwordRegex),
});

/**
 * Validation schema for user login.
 */
const loginValidator = yup.object({
  email: yup
    .string()
    .required("Email required!")
    .trim()
    .email("Email invalid!"),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      "The Password must contain at least 8 characters, one uppercase, one lowercase and a number!"
    ),
});

module.exports = { registerValidator, loginValidator };
