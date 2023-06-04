const yup = require("yup");

/**
 * Module for validating student data using Yup.
 * @module validators/studentValidators
 * @requires yup
 */

/**
 * Validation schema for student.
 */
const updateStudentValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
});

module.exports = updateStudentValidator;
