const cloudinary = require("cloudinary");
const fs = require("fs");
const User = require("../models/users");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const uploadController = {
    uploadAvatar: async (req, res) => {
      try {
        const file = req.file;
        let newAvatarUrl;
  
        cloudinary.v2.uploader.upload(
          file.path,
          {
            folder: "avatar",
            width: 150,
            height: 150,
            crop: "fill",
          },
          async (err, result) => {
            if (err) throw err;
            fs.unlinkSync(file.path);
            newAvatarUrl = result.secure_url;
  
            const id = req.params.id;
  
            try {
              const document = await User.findOneAndUpdate(
                { _id: id },
                { avatarURL: newAvatarUrl },
                { new: true }
              );
  
              if (!document) {
                return res.json({
                  status: "error",
                  code: 400,
                  data: "Bad request",
                  message: "User not found",
                });
              }
  
              return res.json({
                status: "success",
                code: 200,
                data: document,
                message: "Avatar updated successfully",
              });
            } catch (err) {
              console.log(err);
              return res.status(500).json({ msg: "An error occurred in the upload controller" });
            }
          }
        );
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "An error occurred in the upload controller" });
      }
    },
    uploadAvatar2: async (req, res, next) => {
      try {
        const id = req.params.id;
        const newAvatar = req.body.avatar;
    
        const document = await User.findOneAndUpdate(
          { _id: id },
          { avatarURL: newAvatar },
          { new: true }
        );
    
        if (!document) {
          return res.json({
            status: "error",
            code: 400,
            data: "Bad request",
            message: "User not found111111",
          });
        }
    
        return res.json({
          status: "success",
          code: 200,
          data: document,
          message: "Name updated successfully",
        });
      } catch (error) {
        return res.json({
          status: "error",
          code: 500,
          data: error.message,
          message: "Internal server error",
        });
      }
    }
  };
  
  module.exports = uploadController;