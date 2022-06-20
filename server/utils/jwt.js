const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "secretkey";

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: 60 * 30,
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: 60 * 60 * 7,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { createToken, verifyToken, createRefreshToken };
