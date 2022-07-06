const express = require("express");
const {
  login,
  relogin,
  changePassword,
  forgotPassword,
} = require("../../controller/auth.controller");
const { resgisterUser } = require("../../controller/user.controller");

const auth = express.Router();


auth.post("/auth/register", resgisterUser);
auth.post("/auth/login", login);
auth.post("/auth/relogin", relogin);
auth.patch("/auth/change-password", changePassword);
auth.post("/auth/forgot-password", forgotPassword);

module.exports = auth;
