const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  // let token;
  // let decoded;
  // if (req.headers.authorization && req.headers) {
  //   token = req.headers.authorization.split(" ")[1];
  //   if (token !== "null") {
  //     decoded = verifyToken(token);
  //     if (decoded) {
  //       return next();
  //     }
  //     return res.status(401).json({
  //       message: "Unauthorized",
  //       status_code: 401,
  //     });
  //   } else {
  //     return res.status(401).json({
  //       message: "Unauthorized",
  //       status_code: 401,
  //     });
  //   }
  // } else {
  //   return res.status(401).json({
  //     message: "Unauthorized",
  //     status_code: 401,
  //   });
  // }
  return next();
};
