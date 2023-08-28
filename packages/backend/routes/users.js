const express = require("express");
const router = express.Router();
require("dotenv").config();
const avatarUploadMiddleware = require("../middlewares/avatarUploadMiddleware");
const userControllers = require("../controllers/users")
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/users/forgot-password", userControllers.forgetPassword)
router.post("/users/reset-password/:resetToken", userControllers.resetPassword)
router.post("/users/signup", userControllers.signUp)
router.post("/users/login", userControllers.logIn)
router.post("/users/logout", userControllers.auth, userControllers.logOut)
router.post("/users/verify", userControllers.verify)

router.patch("/users/avatars/:id", authMiddleware, avatarUploadMiddleware, userControllers.updateAvatar);


router.get("/users/current", userControllers.auth, userControllers.currentUser)
router.get("/users/verify/:verificationToken", userControllers.verifyUser) 
router.get(`/users/checkEmail/:email`, userControllers.checkEmail)
router.get("/users/name/:id", userControllers.getUserName);
router.get(`/users/checkVerify/:email`, userControllers.checkVerifyEmail)

module.exports = router;
