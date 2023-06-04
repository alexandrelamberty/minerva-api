const yup = require("yup");

/**
 * Module for validating category data using Yup.
 * @module validators/categoryValidators
 * @requires yup
 */

/**
 * Define the validation schema for creating a category.
 */
const createCategoryValidator = yup.object({
  name: yup.string().max(100).trim().required(),
  description: yup.string().trim().required(),
});

/**
 * Define the validation schema for updating a category.
 */
const updateCategoryValidator = yup.object({
  name: yup.string().max(100).trim().required(),
  description: yup.string().trim().required(),
});

module.exports = { createCategoryValidator, updateCategoryValidator };
