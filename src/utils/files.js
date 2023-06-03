const fs = require("fs");

// FIXME: Refactor to generic file utils
/**
 * Cover utils
 *
 * @module utils/files
 * @see {@link https://nodejs.org/api/fs.html|Node.js File System}
 * @param {*} folder
 * @returns {multer.StorageEngine}
 */
const cover = {
  /**
   * Delete a file from the public folder.
   * @memberof module:utils/files
   * @param {*} file
   */
  deleteCover: (file) => {
    try {
      fs.unlinkSync("public" + file);
      console.log("Deleted file successfully.");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cover;
