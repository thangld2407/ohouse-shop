const { pagination } = require("../helper/pagination.js");
const UserSchema = require("../model/user.js");
const ROLE = require("../model/role.js");
const { hashPassword } = require("../utils/hashPassword.js");
module.exports = {
  async resgisterUser(req, res, next) {
    try {
      const user = req.body;
      if (!user.email) {
        return res.status(200).json({
          message: "Email must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!user.password) {
        return res.status(200).json({
          message: "Password must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!user.name) {
        return res.status(200).json({
          message: "Name must be required",
          status: false,
          error_code: 100,
        });
      }
      const is_exist = await UserSchema.findOne({ email: user.email.trim() });
      if (is_exist) {
        return res.status(200).json({
          message: "User already exist",
          status: false,
          error_code: 109,
        });
      }
      const role = await ROLE.findOne({ is_default: true });
      const hash = hashPassword(user.password);
      const data = {
        name: user.name,
        email: user.email,
        password: hash,
        role: role._id,
      };
      const newUser = new UserSchema(data);
      await newUser.save();
      res.status(200).json({
        message: "Register user success",
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async create(req, res, next) {
    try {
      const user = req.body;
      if (!user.email) {
        return res.status(200).json({
          message: "Email must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!user.name) {
        return res.status(200).json({
          message: "Name must be required",
          status: false,
          error_code: 100,
        });
      }
      const is_exist = await UserSchema.findOne({ email: user.email.trim() });
      if (is_exist) {
        return res.status(200).json({
          message: "User already exist",
          status: false,
          error_code: 109,
        });
      }
      const hash = hashPassword("12345678");
      const data = {
        name: user.name,
        email: user.email,
        role: user.role,
        password: hash,
      };
      const newUser = new UserSchema(data);
      newUser.save();
      res.json({
        message: "User has been created",
        status: true,
        data: newUser,
      });
    } catch (error) {
      res.json({ error: error });
    }
  },
  async get(req, res, next) {
    try {
      let { current_page, per_page, q } = req.query;
      let id = req.params.id;
      let options = {};
      if (q) {
        // let user = await UserSchema.find(
        //   {
        //     name: { $regex: q, $options: "i" },
        //   },
        //   "-__v"
        // ).populate("Role", "-__v");
        // return res.status(200).json({
        //   message: "Get users successfully",
        //   status_code: 200,
        //   data: user,
        // });
        options = { ...options, name: { $regex: q, $options: "i" } };
      }
      if (id) {
        let user = await UserSchema.findById(id, "-__v")
          .populate("role", "-__v")
          .lean();
        if (user) {
          return res.json({
            message: "Get user successfully",
            status: true,
            data: user,
          });
        }
        return res.status(200).json({
          message: "User not found",
          status: false,
          error_code: 110,
        });
      }
      let currentPage = parseInt(current_page) || 1;
      let count = await UserSchema.countDocuments();

      let perPage = parseInt(per_page) || 10;
      let paginate = pagination(currentPage, perPage, count);

      const users = await UserSchema.find(options, "-__v")
        .populate("role", "-__v")
        .limit(paginate.per_page)
        .skip((paginate.current_page - 1) * paginate.per_page);

      res.status(200).json({
        message: "Get users successfully",
        status_code: 200,
        data: users,
        pagination: { ...paginate, total: count },
      });
    } catch (error) {
      res.json({ error });
    }
  },
  async edit(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.body;

      const data = {
        name: user.name,
        is_active: user.is_active,
        is_deleted: user.is_deleted,
        role: user.role,
      };
      const userDb = await UserSchema.findByIdAndUpdate(id, data).lean();
      if (userDb) {
        return res.json({
          message: "User has been updated",
          status: true,
        });
      }
      res.status(200).json({
        message: "User not found",
        status: false,
        error_code: 110,
      });
    } catch (error) {
      res.status(500).json({
        error_code: 500,
        message: "Internal server error",
      });
    }
  },
  async deletefn(req, res, next) {
    try {
      const { id } = req.params;
      const userDb = await UserSchema.findByIdAndUpdate(id, {
        is_deleted: true,
      }).lean();
      if (userDb) {
        return res.json({
          message: "User has been deleted",
          status: true,
        });
      }
      return res.status(200).json({
        message: "User not found",
        status: false,
        error_code: 110,
      });
    } catch (error) {
      res.status(500).json({
        error_code: 500,
        message: "Internal server error",
      });
    }
  },
  uploadAvatar(req, res, next) {
    const file = req.file;
    res.json({
      url: `${process.env.BASE_URL}:${process.env.PORT}/uploads/${file.filename}`,
    });
  },
};
