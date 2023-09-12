const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const uploadImage = require("../middlewares/uploadImage");
const uploadController = require("../controllers/upload");
const auth = require("../controllers/users")

router.patch(
  "/upload/:id",
  uploadImage,
  upload,
  auth.auth,
  uploadController.uploadAvatar2
);



module.exports = router;
