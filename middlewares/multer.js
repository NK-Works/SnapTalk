/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const multer = require('multer');
const {v4:uuidv4} = require("uuid")
const path = require('path')

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
    // Generate unique filename for uploaded file
  filename: function (req, file, cb) {
      const uniqueFilename= uuidv4();
    cb(null, uniqueFilename + path.extname(file.originalname));
  }
})

// Create multer instance with configured storage settings
const upload = multer({ storage: storage })
module.exports = upload;