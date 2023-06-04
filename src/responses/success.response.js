// FIXME: Response by resource ?

/**
 * Represents a success response object.
 */
class SuccessResponse {
  /**
   * Creates a new instance of SuccessResponse.
   * @param {*} data - The data to include in the response.
   * @param {number} code - The status code of the response. Default is 200.
   */
  constructor(data, code = 200) {
    /**
     * The data included in the response.
     * @type {*}
     */
    this.result = data;
    /**
     * The status code of the response.
     * @type {number}
     */
    this.statusCode = code;
  }
}

/**
 * Represents a success response object that includes an array of results.
 */
class SuccessArrayResponse {
  /**
   * Creates a new instance of SuccessArrayResponse.
   * @param {Array} data - The array of results to include in the response.
   * @param {number} count - The total count of results.
   * @param {number} code - The status code of the response. Default is 200.
   */
  constructor(data, count, code = 200) {
    /**
     * The array of results included in the response.
     * @type {Array}
     */
    this.results = data;
    /**
     * The total count of results.
     * @type {number}
     */
    this.count = count;
    /**
     * The status code of the response.
     * @type {number}
     */
    this.statusCode = code;
  }
}

module.exports = { SuccessResponse, SuccessArrayResponse };
