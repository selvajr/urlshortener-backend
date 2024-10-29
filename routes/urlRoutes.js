const express = require("express");
const auth = require("../middlewares/auth");
const urlsController = require("../controllers/urlsController");
const urlRouter = express.Router();

urlRouter.post("/create", auth.verifyToken, urlsController.createUrl);
urlRouter.get("/", auth.verifyToken, urlsController.viewUserUrls);
urlRouter.get("/count", auth.verifyToken, urlsController.getUrlCount);
urlRouter.get("/todayCounts", auth.verifyToken, urlsController.getTodayCount);
urlRouter.get("/:endpoint", urlsController.getUrl);
urlRouter.delete("/:endpoint", auth.verifyToken, urlsController.deleteUrl);

module.exports = urlRouter;
