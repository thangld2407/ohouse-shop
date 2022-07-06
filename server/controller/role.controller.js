const ROLE = require("../model/role");
class RoleController {
  async createRole(req, res, next) {
    try {
      const role = req.body;
      if (!role.name) {
        return res.status(200).json({
          message: "Name must be required",
          status: false,
          error_code: 100,
        });
      }
      if (!role.permissions) {
        return res.status(200).json({
          message: "Permissions must be required",
          status: false,
          error_code: 101,
        });
      }
      const is_exist = await ROLE.findOne({ name: role.name.trim() });
      if (is_exist) {
        return res.status(200).json({
          message: "Role already exist",
          status: false,
          error_code: 109,
        });
      }
      const data = {
        name: role.name,
        permissions: role.permissions,
        is_default: role.is_default || false,
      };
      const newRole = new ROLE(data);
      await newRole.save();
      res.status(200).json({
        message: "Role has been created",
        status: true,
        status_code: 200,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
        error_code: 500,
      });
    }
  }
  async getListRole(req, res, next) {
    try {
      const list = await ROLE.find({}, "-__v").lean();
      res.status(200).json({
        message: "Get list role success",
        status: true,
        data: list,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  async editRole(req, res, next) {
    try {
      const role = req.body;
      let data = {
        name: role.name,
        permissions: role.permissions,
      };
      if (role.is_default) {
        const d = await ROLE.findOne({ is_default: true });
        if (d) {
          d.is_default = false;
          await d.save();
        }
        data = { ...data, is_default: role.is_default };
      } else {
        const is_all_default = await ROLE.findOne({ is_default: true });
        if (is_all_default) {
          data = data;
        } else {
          res.status(200).json({
            message: "Role must be default",
            status: false,
            error_code: 109,
          });
        }
      }
      await ROLE.findByIdAndUpdate(role._id, data);
      res.status(200).json({
        message: "Role has been updated",
        status: true,
        status_code: 200,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new RoleController();
