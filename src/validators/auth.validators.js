const yup = require("yup");

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const registerValidator = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),
  email: yup.string().required().trim().email(),
  password: yup.string().required().min(8).matches(passwordRegex),
});

const loginValidator = yup.object({
  email: yup
    .string()
    .required("Email Inexistant.")
    .trim()
    .email("Email Invalide"),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      "The Password must contain at least 8 characters, one uppercase, one lowercase and a number."
    ),
});

module.exports = { registerValidator, loginValidator };
