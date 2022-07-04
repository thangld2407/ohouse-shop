const express = require("express");
const { create, get, edit, deletefn, uploadAvatar } = require("../../controller/user.controller");

const userRouter = express.Router();
const upload = require("../../helper/upload");

userRouter.get("/user", get),
userRouter.get("/user/:id", get),
userRouter.post("/user/create", create);
userRouter.put("/user/:id", edit);
userRouter.delete("/user/:id", deletefn);
userRouter.post("/user/upload",upload.single('avatar_file'), uploadAvatar);

module.exports = userRouter;
