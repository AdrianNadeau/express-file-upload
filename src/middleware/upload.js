const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/company_logos");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  console.log("filetypes",filetypes)
  console.log("mimetype",mimetype)
  const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png, and .gif formats are allowed!"));
  }
};


let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
