const express = require("express");
const AUTH = require("./auth");
const ROUTER_ROLE = require("./role");
const USER = require("./user");

const router = express.Router();

router.use(AUTH);
router.use(USER);
router.use(ROUTER_ROLE);
module.exports = router;
