const yup = require("yup");

const updateTeacherValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
});

module.exports = updateTeacherValidator;
