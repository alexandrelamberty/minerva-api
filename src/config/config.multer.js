const multer = require("multer");
const uuid = require("uuid");

/**
 * Multer DiskStorage configuration
 *
 * @module config/multer
 * @see {@link http://expressjs.com/en/resources/middleware/multer.html|Express multer middleware}
 * @param {string} folder
 * @returns {multer.StorageEngine}
 */
const config = (folder) => {
  return multer.diskStorage({
    // destination is used to determine within which folder the uploaded files
    // should be stored.
    destination: (req, file, callback) => {
      callback(null, `public/images/${folder}`);
    },
    // filename is used to determine what the file should be named inside the
    // folder. If no filename is given, each file will be given a random name
    // that doesn’t include any file extension.
    filename: (req, file, callback) => {
      console.log("multer file : ", file);
      const name = uuid.v4();
      const ext = file.originalname.split(".").at(-1);
      callback(null, name + "." + ext);
    },
  });
};

module.exports = config;
