const oauth = require("./oauth");

module.exports.validateAccessToken = function () {
  return function (req, res, next) {
    if (!req.headers.authorization) {
      res.status(400);
      res.json({
        error: "Invalid request",
        description: "access token is required",
      });
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    oauth
      .authed_request("/api/auth/verify-token", { access_token: token })
      .then((response) => {
        res.locals.token = response.token;
        next();
      })
      .catch((err) => {
        res.status(400);
        res.json(err);
      });
  };
};
//
