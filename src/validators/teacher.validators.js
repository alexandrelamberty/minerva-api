const yup = require("yup");

/**
 * Module for validating teacher data using Yup.
 * @module validators/teacherValidators
 * @requires yup
 */

/**
 * Validation schema for teacherv.
 */
const updateTeacherValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
});

module.exports = updateTeacherValidator;
