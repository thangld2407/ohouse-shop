const express = require("express");
const {
  register,
  login,
  relogin,
  changePassword,
  forgotPassword,
} = require("../../controller/auth.controller");

const auth = express.Router();

function checkPermisson(req, res, next) {

}

auth.post("/auth/register", register);
auth.post("/auth/login", login);
auth.post("/auth/relogin", relogin);
auth.patch("/auth/change-password", changePassword);
auth.post("/auth/forgot-password", forgotPassword);

module.exports = auth;
