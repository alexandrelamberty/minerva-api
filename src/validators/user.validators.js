const yup = require("yup");

const updateUserValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
});

module.exports = updateUserValidator;
