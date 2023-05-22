const yup = require("yup");

const createTrainingValidator = yup.object({
  name: yup.string().required().trim(),
  TrainingCategoryId: yup.number().integer().positive().required(),
  description: yup.string().required().trim(),
  startDate: yup.string().required().trim(),
  endDate: yup.string().required().trim(),
  // courses: yup
  //   .array()
  //   .of(
  //     yup.object({
  //       id: yup.number().integer().positive().required(),
  //     })
  //   )
  //   .required()
  //   .min(1),
});

const updateTrainingValidator = yup.object({
  name: yup.string().trim(),
  TrainingCategoryId: yup.number().integer().positive(),
  description: yup.string().trim(),
  startDate: yup.string().trim(),
  endDate: yup.string().trim(),
  students: yup
    .array()
    .of(
      yup.object({
        id: yup.number().integer().positive().required(),
      })
    )
    .required()
    .min(1),
});

module.exports = { createTrainingValidator, updateTrainingValidator };
