var express = require("express");
var router = express.Router();
var client = require("./client");
var users = require("./users");
var auth = require("./auth");

router.use("/client", client);
router.use("/users", users);
router.use("/auth", auth);

module.exports = router;
