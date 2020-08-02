const express = require("express");
const router = express.Router();
const resource = require("../lib/resource");
let auth_middleware = require("../lib/auth_middleware");
//verify login throughout the route
router.use(auth_middleware.validateAccessToken());

router.post("/books-available", (req, res) => {
  resource
    .resource_request("/books", {})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(404);
      res.json({
        error: "resource unavailable",
        description: "resource requested is unavailable",
      });
    });
});

module.exports = router;
