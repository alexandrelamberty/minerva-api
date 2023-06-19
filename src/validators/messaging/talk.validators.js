const yup = require("yup");

/**
 * Module for validating user messaging data using Yup.
 * @module validators/wsMessagingValidators
 * @requires yup
 */

/**
 * Validation schema for user messaging.
 */
const talkValidator = yup.object({
  message: yup.string().required(),
});

module.exports = { talkValidator };
