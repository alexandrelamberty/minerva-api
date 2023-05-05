const yup = require("yup");

const courseDateValidator = yup.object({
  CourseId: yup.number().integer().positive().required(),
  date: yup.string().required().max(50).trim(),
});

module.exports = courseDateValidator;
