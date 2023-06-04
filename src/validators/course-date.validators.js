const yup = require("yup");

/**
 * Module for validating course date data using Yup.
 * @module validators/courseDateValidators
 * @requires yup
 */

/**
 * Validation schema for course date.
 */
const courseDateValidator = yup.object({
  CourseId: yup.number().integer().positive().required(),
  date: yup.string().required().max(50).trim(),
});

module.exports = courseDateValidator;
