const yup = require("yup");

const artistValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
});

module.exports = artistValidator;
