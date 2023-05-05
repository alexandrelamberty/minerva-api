const yup = require("yup");

const createCourseValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  description: yup.string().required().max(50).trim(),
  TrainingId: yup.number().integer().positive().required(),
  dates: yup.array().of(
    yup.object({
      date: yup.date().required(),
      TeacherId: yup.number().integer().required(),
    })
  ),
});

const updateCourseValidator = yup.object({
  name: yup.string().required().max(50).trim(),
  description: yup.string().required().max(50).trim(),
  TrainingId: yup.number().integer().positive().required(),
  dates: yup
    .array()
    .of(
      yup.object({
        date: yup.date().required(),
        TeacherId: yup.number().integer().required(),
      })
    )
    .required()
    .min(1),
});

module.exports = { createCourseValidator, updateCourseValidator };