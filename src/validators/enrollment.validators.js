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
  // studentId: yup.string().required().trim(),
  // trainingId: yup.string().required().trim(),
  status: yup.string().trim().required(),
  // validated: yup.boolean().required(),
});

module.exports = { createEnrollmentValidator, updateEnrollmentValidator };
