const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, MAIL_ID, URL } = require("../utils/config");
const transporter = require("../utils/transporter");
const randomString = require("../utils/randomString");

const userController = {
  register: async (request, response) => {
    try {
      const { firstName, lastName, email, password } = request.body;

      const user = await User.findOne({ email });

      if (user) {
        return response
          .status(400)
          .json({ message: "user already registerd with this mail" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      transporter.sendMail({
        from: MAIL_ID,
        to: email,
        subject: "Activate your account",
        text: `Click here to Activate your account: ${URL}/activate/${savedUser._id}`,
      });

      response.status(200).json({ message: "user successfully created" });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  activate: async (request, response) => {
    const id = request.params.id;

    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({ message: "user not found" });
    }
    if (user.isActive == true) {
      return response.status(400).json({ message: "user already activated" });
    }
    user.isActive = true;

    user.save();
    response
      .status(200)
      .json({ message: "user activated successfully created" });
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }
      if (!user.isActive) {
        return response.status(400).json({ message: "User not Activated" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.status(400).send({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user._id }, SECRET_KEY);
      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 3600000),
      });
      response.status(200).json({ message: "Login succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      response.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },

  getProfile: async (request, response) => {
    try {
      const userId = request.userId;

      const user = await User.findById(userId).select("-password -__v -_id");

      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      response.status(200).json({ message: "User profile", user });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  forgot: async (request, response) => {
    try {
      const { email } = request.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }
      const key = randomString(28);

      user.key = key;
      user.save();
      transporter.sendMail({
        from: MAIL_ID,
        to: email,
        subject: "reset pasword",
        text: `Click here to reset your password: ${URL}/verify/${key}`,
      });
      response
        .status(200)
        .json({ message: "password reset link is sended succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  verify: async (request, response) => {
    try {
      const key = request.params.key;

      const user = await User.findOne({ key });

      if (!user) {
        return response.status(400).json({ message: "Link was expiried" });
      }

      response.status(200).json({ message: "Link is verified succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  reset: async (request, response) => {
    try {
      const { password, key } = request.body;

      const user = await User.findOne({ key });

      if (!user) {
        return response.status(400).json({ message: "Link was expiried !!!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user.key = "";

      user.password = hashedPassword;

      await user.save();

      response.status(200).json({ message: "Password is changed succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
