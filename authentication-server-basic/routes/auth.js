const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const auth_middleware = require("../lib/auth_validations");
const validation = require("../lib/input_validations");
const tokenIssuer = require("../lib/tokenIssuer");
const { getUserByEmail } = require("../models/usersModel");
//validate all incoming requests
router.use(auth_middleware.validateClient());

router.post("/token", validation.validateTokenReq(), async (req, res) => {
  let { refresh_token, email, password } = req.body;
  if (refresh_token) {
    //verify refresh token and update access token
    tokenIssuer
      .validateRefreshToken(refresh_token)
      .then((tokenInfo) => {
        tokenIssuer
          .updateToken(tokenInfo)
          .then((newToken) => {
            delete newToken._id;
            delete newToken.__v;
            res.json({ newToken });
          })
          .catch((e) => {
            res.status(402);
            res.json({
              error: "System error",
              error_description: "Unable to issue token",
            });
            return;
          });
      })
      .catch((e) => {
        res.status(400);
        res.json({
          error: "Authentication error",
          error_description: "Invalid refresh token",
        });
        return;
      });
  } else {
    //verify email and password,issue token
    getUserByEmail(email).then(async (user) => {
      if (!user) {
        res.status(400);
        res.json({
          error: "Authentication error",
          error_description: "Invalid username or email",
        });
        return;
      }
      let inputpassword = pbkdf2
        .pbkdf2Sync(req.body.password, "salt", 1, 32, "sha512")
        .toString();
      // console.log("user->", user, inputpassword);
      if (user.password != inputpassword) {
        res.status(400);
        res.json({
          error: "Authentication error",
          error_description: "Invalid username or email",
        });
        return;
      }
      tokenIssuer
        .issueToken(user._id)
        .then((token) => {
          res.json(token);
        })
        .catch((e) => {
          res.status(402);
          res.json({
            error: "System error",
            error_description: "Unable to issue token",
          });
          return;
        });
    });
  }
});

router.post(
  "/verify-token",
  validation.validateAccessTokenReq(),
  auth_middleware.validateAccessToken(),
  (req, res) => {
    let token = res.locals.token;
    delete token._id;
    delete token.__v;
    res.json({ message: "access token verified", token });
  }
);

module.exports = router;
