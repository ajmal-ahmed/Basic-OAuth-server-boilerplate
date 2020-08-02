const axios = require("axios");

const sso_url = process.env.SSOURL || "http://localhost:4001"; //Authentcation server url
const client_id = process.env.CID || "CID"; //client Id obtained from Authentcation server
const client_secret = process.env.CSECRET || "CSECRET"; //client Secret obtained from Authentcation server

exports.authed_request = (url, body) => {
  return new Promise((resolve, reject) => {
    url = sso_url + url;
    body.clientId = client_id;
    body.clientSecret = client_secret;
    axios
      .post(url, body, {})
      .then(function (response) {
        resolve(response.data);
        return;
      })
      .catch(function (error) {
        // console.log(error);
        // if error obtained from authentication server forward it
        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject({
            error: "System error",
            description: "Authentication server unavailable.",
          });
        }
      });
  });
};
