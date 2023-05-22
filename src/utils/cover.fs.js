const fs = require("fs");

const cover = {
  deleteCover: (file) => {
    try {
      fs.unlinkSync("public" + file);
      console.log("Delete File successfully.");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cover;
