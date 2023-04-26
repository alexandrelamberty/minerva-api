const yup = require("yup");

const publisherValidator = yup.object({
  name: yup.string().required().max(50).trim(),
});

module.exports = publisherValidator;
