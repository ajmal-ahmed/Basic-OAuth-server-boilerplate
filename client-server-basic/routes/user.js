const express = require("express");
const router = express.Router();
let auth_middleware = require("../lib/auth_middleware");
const oauth = require("../lib/oauth");
//verify login throughout the route
router.use(auth_middleware.validateAccessToken());

// router.post("/get-profile", (req, res) => {
//   oauth.authed_request("/api/users/get_user",{user_id:res.locals.token.user_id})
// });

router.post("/get-profile", (req, res) => {
  oauth
    .authed_request("/api/users/get_user", {
      user_id: res.locals.token.user_id,
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});
module.exports = router;
