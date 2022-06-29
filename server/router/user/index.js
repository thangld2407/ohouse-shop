const express = require("express");
const { create, get, edit, deletefn } = require("../../controller/user.controller");

const userRouter = express.Router();

userRouter.get("/user", get),
userRouter.get("/user/:id", get),
userRouter.post("/user/create", create);
userRouter.put("/user/:id", edit);
userRouter.delete("/user/:id", deletefn);

module.exports = userRouter;
