const yup = require("yup");

const materialValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  file: yup.string().required().max(50).trim(),
  CourseId: yup.number().integer().positive().required(),
});

module.exports = materialValidator;
