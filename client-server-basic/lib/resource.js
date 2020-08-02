const axios = require("axios");

const client_secret = process.env.CSECRET || "CSECRET"; //client Secret obtained from Authentcation server

const res_url = process.env.RESURL || "http://localhost:3004"; //Authentcation server url

exports.resource_request = (url, token) => {
  return new Promise((resolve, reject) => {
    url = res_url + url;
    axios
      .post(url, {}, { headers: { Authorization: "Bearer " + token } })
      .then(function (response) {
        resolve(response.data);
        return;
      })
      .catch(function (error) {
        console.log(error);
        // if error obtained from resource
        if (error.response && error.response.data) {
          reject({
            error: "System error",
            description: "Resource requested unavailable.",
          });
        } else {
          reject({
            error: "System error",
            description: "Resource server unavailable.",
          });
        }
      });
  });
};
