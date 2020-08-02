const uuidv4 = require("uuid").v4;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validation = require("../lib/input_validations");
const clientModel = require("../models/clientModel");

router.post(
  "/create",
  validation.validateClientCreateRequest(),
  async (req, res) => {
    //generate client fundementals
    let { client_name } = req.body;
    let client = { client_name: client_name };
    client.clientId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    client.clientSecret = await bcrypt.hash(client_name, salt);
    clientModel.register(client, (err, clientInfo) => {
      if (err) {
        res.status(403).json({
          error: "System error",
          description: "unable to create client",
        });
        return;
      }
      res.json({ message: "Client created successfully", client });
    });
  }
);

module.exports = router;
