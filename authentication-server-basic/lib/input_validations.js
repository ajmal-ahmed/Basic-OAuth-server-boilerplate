const { default: validator } = require("validator");
module.exports.validateClientCreateRequest = function () {
  return function (req, res, next) {
    if (!req.body.client_name) {
      res.status(400).json({
        error: "Invalid request",
        description: "client_name is required",
      });
      return;
    }
    next();
  };
};

module.exports.validateUserCreateRequest = function () {
  return function (req, res, next) {
    if (!req.body.email) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "Email is required.",
      });
      return;
    }
    if (!validator.isEmail(req.body.email)) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "Please use a valid email address",
      });
      return;
    }
    if (!req.body.first_name || !req.body.last_name) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "First name and lastname are required feilds.",
      });
      return;
    }
    if (!req.body.password || req.body.password != req.body.confirm_password) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "Passwords should be same.",
      });
      return;
    }

    if (req.body.password.length < 8) {
      res.status(400);
      res.json({
        error: "Invalid request",
        error_description: "Password must be 8 charactor or long.",
      });
      return;
    }
    next();
  };
};
module.exports.validateGetUserReq = function () {
  return function (req, res, next) {
    if (!req.body.user_id) {
      res.status(400).json({
        error: "Invalid request",
        description: "user_id is required",
      });
      return;
    }
    if (!validator.isMongoId(req.body.user_id)) {
      res.status(400).json({
        error: "Invalid request",
        description: "Invalid user_id",
      });
      return;
    }
    next();
  };
};

module.exports.validateTokenReq = function () {
  return function (req, res, next) {
    let { refresh_token, email, password } = req.body;
    if (!refresh_token) {
      if (!(email && password)) {
        res.status(400).json({
          error: "Invalid request",
          description: "refresh token or email-password pair is required",
        });
        return;
      }
    }
    next();
  };
};

module.exports.validateAccessTokenReq = function () {
  return function (req, res, next) {
    if (!req.body.access_token) {
      res.status(400).json({
        error: "Invalid request",
        description: "access_token is required",
      });
      return;
    }
    next();
  };
};
