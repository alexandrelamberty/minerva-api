const yup = require("yup");

const createEnrollmentValidator = yup.object({
  StudentId: yup.string().required().trim(),
  TrainingId: yup.string().required().trim(),
});

const updateEnrollmentValidator = yup.object({
  StudentId: yup.string().required().trim(),
  TrainingId: yup.string().required().trim(),
});

module.exports = { createEnrollmentValidator, updateEnrollmentValidator };
