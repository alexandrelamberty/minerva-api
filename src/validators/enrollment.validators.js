const yup = require("yup");

/**
 * Module for validating enrollment data using Yup.
 * @module validators/courseValidators
 * @requires yup
 */

/**
 * Define the validation schema for creating an enrollment.
 */
const createEnrollmentValidator = yup.object({
  StudentId: yup.string().required().trim(),
  TrainingId: yup.string().required().trim(),
});

/**
 * Define the validation schema for updating a course.
 */
const updateEnrollmentValidator = yup.object({
  StudentId: yup.string().required().trim(),
  TrainingId: yup.string().required().trim(),
});

module.exports = { createEnrollmentValidator, updateEnrollmentValidator };
