const yup = require("yup");

/**
 * Module for validating enrollment data using Yup.
 * @module validators/userValidators
 * @requires yup
 */

/**
 * Define the validation schema for updating a user.
 */
const updateUserValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
});

module.exports = updateUserValidator;
