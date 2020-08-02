var ClientModel = require("../models/clientModel");
var tokensModel = require("../models/tokensModel");

module.exports.validateClient = function () {
  return async function (req, res, next) {
    let { clientId, clientSecret } = req.body;
    if (!clientId) {
      res.status(400);
      res.json({
        error: "Invalid request",
        description: "clientId is required",
      });
      return;
    }
    if (!clientSecret) {
      res.status(400);
      res.json({
        error: "Invalid request",
        description: "clientSecret is required",
      });
      return;
    }

    let clientInfo = await ClientModel.getByclientId(clientId);

    if (!clientInfo) {
      return res
        .status(403)
        .json({ error: "Invalid request", description: "Invalid Credentials" });
    }
    if (clientInfo.clientSecret != clientSecret) {
      return res.status(403).json({
        error: "Invalid request",
        description: "Invalid clientId or clientSecret",
      });
    }
    res.locals.clientInfo = clientInfo;
    next();
  };
};

module.exports.validateAccessToken = function () {
  return async function (req, res, next) {
    let { access_token } = req.body;
    if (!access_token) {
      res.status(400);
      res.json({
        error: "Invalid request",
        description: "access token is required",
      });
      return;
    }
    let tokenInfo = await tokensModel.getTokenByAccesstoken(access_token);

    if (!tokenInfo) {
      return res.status(400).json({
        error: "Authentication failed",
        description: "Invalid access token",
      });
    }
    let currentTime = new Date(tokenInfo.eat).getTime();
    let expiry = new Date(tokenInfo.eat).getTime();
    if (currentTime > expiry) {
      return res.status(400).json({
        error: "Authentication failed",
        description: "access token expired",
      });
    }
    res.locals.token = tokenInfo;
    next();
  };
};
