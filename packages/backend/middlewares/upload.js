const fs = require("fs");

module.exports = (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined")
    return res.status(400).json({ msg: "Issue with uploading this image" });

  const image = req.file.path;

  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("jpg") &&
    !req.file.mimetype.includes("png")
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "This file type is not supported" });
  }

  if (req.file.size > 1024 * 1024) {
    fs.unlinkSync(image);
    return res.status(400).json({ msg: "This file is to large (MAX: 1MB)" });
  }
  next();
};
