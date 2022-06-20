const Auth = require("../model/auth");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const {
  createToken,
  createRefreshToken,
  verifyToken,
} = require("../utils/jwt");

module.exports = {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const is_email = await Auth.findOne({ email: email });
      if(!email || !password) {
        res.json({ error: "Email or password is empty" });
      }else {
        if (is_email) {
          return res.status(201).json({
            data: {},
            message: "Email already exists",
            status_code: 201,
          });
        } else {
          let hash = hashPassword(password);
          const newAuth = new Auth({ email: email, password: hash, name: name });
          newAuth.save();
          res.status(200).json({
            message: "Registration successful",
            status_code: 200,
            data: {
              email: newAuth.email,
            },
          });
        }
      }
    } catch (error) {
      res.json({ error });
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const is_email = await Auth.findOne({ email: email });

      if (is_email) {
        let hash = is_email.password;
        let is_valid = comparePassword(password, hash);
        if (is_valid) {
          const token = createToken({ user: is_email });
          const refreshToken = createRefreshToken({ user: is_email });
          console.log("authorization");
          res.header("authorization", token);
          res.status(200).json({
            message: "Login successful",
            status_code: 200,
            access_token: token,
            refresh_token: refreshToken,
            expires_in: 7200,
          });
        } else {
          res.status(401).json({
            message: "Invalid password",
            status_code: 401,
          });
        }
      }
    } catch (error) {
      res.json(error);
    }
  },
  async relogin(req, res, next) {
    try {
      const { refresh_token } = req.body;
      let { user } = verifyToken(refresh_token);
      const is_email = await Auth.findOne({ email: user.email });
      if (is_email) {
        const token = createToken({ user: is_email });
        const refreshToken = createRefreshToken({ user: is_email });
        res.header("authorization", token);
        res.status(200).json({
          message: "relogin successful",
          status_code: 200,
          access_token: token,
          refresh_token: refreshToken,
          expires_in: 7200,
        });
      } else {
        res.status(201).json({
          message: "relogin failed",
          status_code: 201,
          err_message: "refresh_token is invalid",
        });
      }
    } catch (error) {
      res.json({ error: error });
    }
  },
  async changePassword(req, res, next) {
    try {
      let token;
      if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        res.status(401).json({
          message: "Unauthorized",
          status_code: 401,
        });
      }
      let decoded;
      try {
        let { user } = verifyToken(token);
        decoded = user;
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
      const account = await Auth.findOne({ email: decoded.email });
      if (account) {
        const { old_password, new_password } = req.body;
        let is_valid = comparePassword(old_password, account.password);
        if (is_valid) {
          let new_update = await Auth.findByIdAndUpdate(account._id, {
            password: hashPassword(new_password),
          });
          res.status(200).json({
            message: "Password updated successfully",
            status_code: 200,
            data: new_update,
          });
        }
      } else {
        res.status(500).json({
          message: "Account not found",
          status_code: 404,
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  async forgotPassword(req, res, next) {
    try {
      const { email, new_password } = req.body;
      const is_email = await Auth.findOne({ email: email });
      if (is_email) {
        let new_update = await Auth.findByIdAndUpdate(is_email._id, {
          password: hashPassword(new_password),
        });
        res.status(200).json({
          message: "Password has changed successfully",
          status_code: 200,
          data: new_update,
        });
      } else {
        res.status(201).json({
          message: "Email does not exist",
          status_code: 201,
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
