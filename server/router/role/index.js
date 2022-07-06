const express = require("express");
const roleController = require("../../controller/role.controller");
const ROUTER_ROLE = express.Router();

ROUTER_ROLE.post("/role/create", roleController.createRole);
ROUTER_ROLE.put("/role/edit", roleController.editRole);
ROUTER_ROLE.get("/role/list", roleController.getListRole);

module.exports = ROUTER_ROLE;