var express = require("express");
var router = express.Router();
var user = require("./user");
var resources = require("./resources");
var auth = require("./auth");

router.use("/user", user);
router.use("/resources", resources);
router.use("/auth", auth);

module.exports = router;
