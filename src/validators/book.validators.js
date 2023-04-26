const yup = require("yup");

const bookValidator = yup.object({
  title: yup.string().max(100).trim().required(),
  description: yup.string().max(255).trim().required(),
  GenreId: yup.number().integer().positive().required(),
  PublisherId: yup.number().integer().positive().required(),
  authors: yup
    .array()
    .of(
      yup.object({
        id: yup.number().integer().positive().required(),
      })
    )
    .required()
    .min(1),
  cover: yup.string().trim().nullable(),
});

const bookCoverValidator = yup.object().shape({
  cover: yup.mixed() /*.required("Image requise")*/,
});

module.exports = { bookValidator, bookCoverValidator };
