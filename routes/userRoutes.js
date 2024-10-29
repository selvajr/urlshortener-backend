const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/profile", auth.verifyToken, userController.getProfile);
userRouter.put("/activate/:id", userController.activate);
userRouter.put("/forgot", userController.forgot);
userRouter.get("/verify/:key", userController.verify);
userRouter.put("/reset/", userController.reset);

module.exports = userRouter;
