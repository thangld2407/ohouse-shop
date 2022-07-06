const express = require("express");
const {
  create,
  get,
  edit,
  deletefn,
  uploadAvatar,
} = require("../../controller/user.controller");

const userRouter = express.Router();
const upload = require("../../helper/upload");
const requireAuth = require("../../middleware/requireAuth");

userRouter.get("/user", requireAuth, get),
  userRouter.get("/user/:id", requireAuth, get),
  userRouter.post("/user/create", requireAuth, create);
userRouter.put("/user/:id", requireAuth, edit);
userRouter.delete("/user/:id", requireAuth, deletefn);
userRouter.post("/user/upload", upload.single("avatar_file"), uploadAvatar);

module.exports = userRouter;
