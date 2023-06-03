const fs = require("fs");

// FIXME: Refactor to generic file utils
/**
 * Cover utils
 * https://nodejs.org/api/fs.html
 */
const cover = {
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
