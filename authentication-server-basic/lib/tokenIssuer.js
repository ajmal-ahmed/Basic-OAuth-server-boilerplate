const uuidv3 = require("uuid").v3;
const uuidv2 = require("uuid").v2;
const { v1: accessToken, v4: refreshToken } = require("uuid");
const tokensModel = require("../models/tokensModel");

module.exports.issueToken = function (userId) {
  return new Promise((resolve, reject) => {
    let access_token = accessToken();
    let refresh_token = refreshToken();
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    let eat = expiry.toISOString();
    let token = {
      access_token: access_token,
      refresh_token: refresh_token,
      eat: eat,
      user_id: userId,
    };
    tokensModel.newToken(token, (err, tokenInfo) => {
      if (err) {
        reject("Unable to issue token");
        return;
      }
      resolve(token);
    });
  });
};

module.exports.updateToken = function (token) {
  return new Promise((resolve, reject) => {
    let access_token = accessToken();
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);
    let eat = expiry.toISOString();
    token.access_token = access_token;
    token.eat = eat;
    tokensModel.update(token._id, token, (err, tokenInfo) => {
      if (err) {
        reject("Unable to issue token");
        return;
      }
      resolve(token);
    });
  });
};
module.exports.validateRefreshToken = function (refresh_token) {
  return new Promise(async (resolve, reject) => {
    let tokenInfo = await tokensModel.getTokenByRefreshtoken(refresh_token);
    if (!tokenInfo) {
      reject("Invalid refresh token");
      return;
    }
    resolve(tokenInfo);
  });
};
