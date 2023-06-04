const yup = require("yup");

/**
 * Module for validating course material data using Yup.
 * @module validators/courseMaterialValidators
 * @requires yup
 */

/**
 * Validation schema for course material.
 */
const courseMaterialValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  file: yup.string().required().max(50).trim(),
  CourseId: yup.number().integer().positive().required(),
});

module.exports = { courseMaterialValidator };
