const yup = require("yup");

/**
 * Module for validating course data using Yup.
 * @module validators/courseValidators
 * @requires yup
 */

/**
 * Define the validation schema for creating a course.
 */
const createCourseValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  description: yup.string().required().max(50).trim(),
  Teacher: yup.object({
    id: yup.number().integer().required(),
  }),
  Training: yup.object({
    id: yup.number().integer().required(),
  }),
  dates: yup.array().of(
    yup.object({
      date: yup.date().required(),
      TeacherId: yup.number().integer().required(),
    })
  ),
});

/**
 * Define the validation schema for updating a course.
 */
const updateCourseValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  description: yup.string().required().max(50).trim(),
  TeacherId: yup.string().required(),
  TrainingId: yup.string().required(),
  dates: yup
    .array()
    .of(
      yup.object({
        date: yup.date().required(),
        TeacherId: yup.number().integer().required(),
        CourseId: yup.number().integer().required(),
      })
    )
    .required()
    .min(1),
});

module.exports = { createCourseValidator, updateCourseValidator };
