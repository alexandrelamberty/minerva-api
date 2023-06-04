/**
 * Represents an error response object.
 */
class ErrorResponse {
  /**
   * Creates a new instance of ErrorResponse.
   * @param {string} msg - The error message to include in the response.
   * @param {number} code - The status code of the response. Default is 400.
   */
  constructor(msg, code = 400) {
    /**
     * The error message included in the response.
     * @type {string}
     */
    this.msg = msg;
    /**
     * The status code of the response.
     * @type {number}
     */
    this.statusCode = code;
  }
}

module.exports = { ErrorResponse };
