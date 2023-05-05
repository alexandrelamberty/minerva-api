const yup = require("yup");

const createTrainingValidator = yup.object({
  name: yup.string().required().trim(),
  description: yup.string().required().trim(),
  startDate: yup.string().required().trim(),
  endDate: yup.string().required().trim(),
  TrainingCategoryId: yup.number().integer().positive().required(),
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

module.exports = createTrainingValidator;
