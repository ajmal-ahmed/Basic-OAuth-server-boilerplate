const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const auth_middleware = require("../lib/auth_validations");
const validation = require("../lib/input_validations");
const {
  createUser,
  getUserByEmail,
  get_user,
} = require("../models/usersModel");
const { default: validator } = require("validator");
//validate all incoming requests
router.use(auth_middleware.validateClient());

router.post("/create", validation.validateUserCreateRequest(), (req, res) => {
  getUserByEmail(req.body.email).then((data) => {
    if (data) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "User already exists",
      });
      return;
    }
    let password = pbkdf2.pbkdf2Sync(
      req.body.password,
      "salt",
      1,
      32,
      "sha512"
    );

    createUser(
      {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: password.toString(),
      },
      (err, data) => {
        if (err) {
          res.status(403).json({
            error: "System error",
            description: "unable to create client",
          });
          return;
        }
        res.json({ message: "Account created successfully" });
      }
    );
  });
});
router.post("/get_user", validation.validateGetUserReq(), (req, res) => {
  get_user(req.body.user_id)
    .then((user) => {
      if (!user) {
        res.status(400);
        res.json({
          error: "Invalid request",
          error_description: "User not found.",
        });
        return;
      }
      res.json({ user });
    })
    .catch((err) => {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "Unable to find user",
      });
    });
});

module.exports = router;
