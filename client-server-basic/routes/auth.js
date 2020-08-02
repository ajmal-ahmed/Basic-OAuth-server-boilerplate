const express = require("express");
const router = express.Router();
const oauth = require("../lib/oauth");
let auth_middleware = require("../lib/auth_middleware");
//verifyAccessToken,
router.post("/sign-up", (req, res) => {
  oauth
    .authed_request("/api/users/create", req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});
router.post("/sign-in", (req, res) => {
  oauth
    .authed_request("/api/auth/token", req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});

router.post(
  "/verify-token",
  auth_middleware.validateAccessToken(),
  (req, res) => {
    let token = res.locals.token;
    delete token.user_id;
    res.json(res.locals.token);
  }
);

module.exports = router;
