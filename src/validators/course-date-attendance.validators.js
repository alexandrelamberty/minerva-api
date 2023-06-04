const yup = require("yup");

/**
 * Module for validating course date attendance data using Yup.
 * @module validators/courseDateAttendanceValidators
 * @requires yup
 */

/**
 * Validation schema for course date attendance.
 */
const courseDateAttendanceValidator = yup.object({
  CourseId: yup.number().integer().positive().required(),
  date: yup.string().required().max(50).trim(),
});

module.exports = courseDateValidator;
