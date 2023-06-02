const yup = require("yup");

const createCategoryValidator = yup.object({
  name: yup.string().max(100).trim().required(),
  description: yup.string().trim().required(),
});

const updateCategoryValidator = yup.object({
  name: yup.string().max(100).trim().required(),
  description: yup.string().trim().required(),
});

module.exports = { createCategoryValidator, updateCategoryValidator };
