const { pagination } = require("../helper/pagination.js");
const UserSchema = require("../model/user.js");
module.exports = {
  async create(req, res, next) {
    try {
      const user = req.body;
      const is_exist = await UserSchema.findOne({ email: user.email });
      if (is_exist) {
        return res.status(200).json({
          message: "Email already exist",
          status: false,
          error_code: 109,
        });
      }
      if (!user.name) {
        return res.status(200).json({
          message: "Name must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!user.dob) {
        return res.status(200).json({
          message: "Date of birth must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!user.email) {
        return res.status(200).json({
          message: "Email must be required",
          status: false,
          error_code: 100,
        });
      }
      const data = {
        name: user.name,
        email: user.email,
        dob: user.dob,
        role: user.role,
        is_active: user.is_active || false,
        is_deleted: user.is_deleted || false,
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
      if(q) {
        let user = await UserSchema.find({ name: { $regex: q, $options: "i" } });
        return res.status(200).json({
          message: "Get users successfully",
          status_code: 200,
          data: user,
        });
      }
      if (id) {
        let user = await UserSchema.findById(id, "-__v").lean();
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

      const users = await UserSchema.find()
        .limit(paginate.per_page)
        .skip((paginate.current_page - 1) * paginate.per_page);

      res.status(200).json({
        message: "Get users successfully",
        status_code: 200,
        data: users,
        pagination: paginate,
      });
    } catch (error) {
      res.json({ error });
    }
  },
  async edit(req, res, next) {
    try {
      const user = req.body;
      const { id } = req.params;
      const data = {
        name: user.name,
        email: user.email,
        dob: user.dob,
        role: user.role,
        is_active: user.is_active,
        is_deleted: user.is_deleted,
      };
      // if (!data.name) {
      //   return res.status(200).json({
      //     message: "Name must be required",
      //     status: false,
      //     error_code: 100,
      //   });
      // }
      // if (!data.dob) {
      //   return res.status(200).json({
      //     message: "Date of birth must be required",
      //     status: false,
      //     error_code: 100,
      //   });
      // }

      const userDb = await UserSchema.findByIdAndUpdate(id, data).lean();
      const userUpdated = await UserSchema.findById(id, "-__v").lean();
      if (userDb) {
        return res.json({
          message: "User has been updated",
          status: true,
          data: userUpdated,
        });
      }
      return res.status(100).json({
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
    res.json({ url: `${process.env.BASE_URL}:${process.env.PORT}/uploads/${file.filename}` });
  },
};
