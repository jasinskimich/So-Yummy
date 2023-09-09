const jwt = require("jsonwebtoken");
const passport = require("passport");
const crypto = require("crypto");
// const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const Recipes = require("../models/recipes");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "walletavengersapp@gmail.com",
    subject: "Please verify your email and registration.",
    text: `URL to mail verification: ${verificationToken}`,
    html: `<p>Click <a href="https://localhost:5000/api/users/verify/${verificationToken}"><strong>here</strong></a> to verify your email and registration.</p>`,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendPasswordResetEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.token = resetToken;
  await user.save();

  const msg = {
    to: email,
    from: "walletavengersapp@gmail.com",
    subject: "Reset Your Password",
    text: `Click on the link to reset your password: http:/localhost:3000/reset-password/${resetToken}`,
    html: `<p>Click <a href="http:/localhost:3000/reset-password/${resetToken}"><strong>here</strong></a> to reset your password.</p>`,
  };

  return sgMail.send(msg);
};

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: "Missing required field email",
    });
  }

  try {
    await sendPasswordResetEmail(email);

    return res.json({
      status: "success",
      code: 200,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      code: 500,
      message: "Failed to send password reset email",
    });
  }
};

const resetPassword = async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const newPassword = req.body.password;

  try {
    const user = await User.findOne({ token: resetToken });

    if (!user) {
      return res.json({
        status: "error",
        code: 404,
        message: "Password reset token is invalid or expired",
      });
    }

    user.setPassword(newPassword);
    user.token = null;
    await user.save();

    return res.json({
      status: "success",
      code: 200,
      message: "Password has been reset",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      code: 500,
      message: "An error occurred while resetting your password",
    });
  }
};

const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new User({ email });

    newUser.name = name;

    newUser.setPassword(password);

    newUser.verificationToken = uuidv4();

    await newUser.save();

    await sendVerificationEmail(email, newUser.verificationToken);

    const newRecipes = new Recipes({
      owner: newUser._id,
      sum: 0,
      receipes: [],
    });
    await newRecipes.save();

    res.json({
      status: "success",
      code: 201,
      data: "Created",
      message: "Register complete! Check your email to confirm verification.",
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const loginVerify = user.verify;

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login or password",
    });
  }

  if (loginVerify === false) {
    return res.json({
      status: "error",
      code: 404,
      data: "Not found",
      message: "Incorrect login or password. Check if your login is verified.",
    });
  }

  const payload = {
    id: user.id,
  };

  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "30d" });

  user.token = token;

  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user,
    },
  });
};

const logOut = async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized",
    });
  }

  user.token = null;
  await user.save();

  return res.json({
    status: "success",
    code: 204,
    message: "Logout successful",
  });
};

const currentUser = async (req, res, next) => {
  const email = req.user.email;
  const name = req.user.name;
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized",
    });
  }

  return res.json({
    status: "success",
    code: 200,
    data: {
      email,
      name,
    },
    message: `Current user is ${email}`,
  });
};

const verifyUser = async (req, res, next) => {
  const user = await User.findOne({
    verificationToken: req.params.verificationToken,
  });

  if (!user) {
    return res.json({
      status: "error",
      code: 404,
      message: "User not found",
      data: "Not found",
    });
  }

  try {
    user.verify = true;
    user.verificationToken = "null";
    await user.save();

    res.send(
      `<h1>Registration Complete!</h1><p>Click <a href="https://localhost:3000/login"><strong>here</strong></a> to go to the login page.</p>`
    );
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: "Missing required field email",
    });
  }

  if (email && user.verify === true) {
    return res.json({
      status: "error",
      code: 400,
      message: "Verification has already passed",
    });
  }

  if (email && user.verify === false) {
    await sendVerificationEmail(email, user.verificationToken);

    return res.json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }
};

const checkEmail = async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
};

const getUserName = async (req, res, next) => {
  try {
    const id = req.params.id;

    const document = await User.findOne({ _id: id });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const name = document.name;

    res.json({ name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const checkVerifyEmail = async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (user.verify === true) {
    return res.json({ verification: true });
  } else {
    return res.json({ verification: false });
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const avatar = req.file;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Not authorized from the controller" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const avatarFilename = `${userId}${path.extname(avatar.originalname)}`;
    const avatarDirectory = "./public/avatars";

    if (!fs.existsSync(avatarDirectory)) {
      fs.mkdirSync(avatarDirectory, { recursive: true });
    }

    const tmpPath = path.join(__dirname, `../tmp/${avatarFilename}`);
    const avatarPath = path.join(
      __dirname,
      `../public/avatars/${avatarFilename}`
    );

    try {
      await Jimp.read(avatar.path);
      const processedAvatar = await Jimp.read(avatar.path);
      processedAvatar.resize(250, 250);
      await processedAvatar.writeAsync(tmpPath);

      await fs.promises.rename(tmpPath, avatarPath);

      await fs.promises.unlink(avatar.path);

      user.avatarURL = `/avatars/${avatarFilename}`;
      await user.save();

      res.json({ avatarURL: user.avatarURL });
    } catch (error) {
      await fs.promises.unlink(avatar.path);
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const editName = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newName = req.body.name;
    
    const document = await User.findOneAndUpdate(
      { _id: id },
      { name: `${newName}` },
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
};

module.exports = {
  auth,
  sendVerificationEmail,
  sendPasswordResetEmail,
  forgetPassword,
  resetPassword,
  signUp,
  logIn,
  logOut,
  currentUser,
  verifyUser,
  verify,
  checkEmail,
  getUserName,
  checkVerifyEmail,
  updateAvatar,
  editName,
};
