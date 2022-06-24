const { pagination } = require("../helper/pagination.js");
const UserSchema = require("../model/user.js");
const { isFloat } = require("../utils/validation.js");
module.exports = {
  create(req, res, next) {
    const user = req.body;

    const data = {
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      dob: user.dob,
    };
    const newUser = new UserSchema(data);
    newUser.save();
    res.json({
      message: "user created",
      data: newUser,
    });
  },
  async get(req, res, next) {
    try {
      let { current_page, per_page } = req.query;
      let currentPage = parseInt(current_page) || 1;
      let count = await UserSchema.countDocuments();

      
      let perPage = parseInt(per_page) || 10;
      let totalPage = count / perPage;
      let paginate = pagination(currentPage, perPage, count)

      const users = await UserSchema.find()
        .limit(paginate.per_page)
        .skip((paginate.current_page - 1) * paginate.per_page);

      res.status(200).json({
        message: "Get users successfully",
        status_code: 200,
        data: users,
        pagination: paginate
      });
    } catch (error) {
      res.json({ error });
    }
  },
};
