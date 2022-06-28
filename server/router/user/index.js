const express = require("express");
const { create, get } = require("../../controller/user.controller");

const userRouter = express.Router();

userRouter.get("/user", get),
userRouter.get("/user/:id", get),
userRouter.post("/user/create", create);

module.exports = userRouter;
