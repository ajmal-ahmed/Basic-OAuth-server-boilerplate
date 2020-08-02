require("dotenv").config({ path: __dirname + "/.env" }); //load env variables
const express = require("express");
const app = express();
let books = require("./books.json");
//extended: true ->support parsing of application/x-www-form-urlencoded post data
app.use(express.json({ extended: false }));

app.post("/books", (req, res) => {
  //validate token if necessary for role or subscription based access restrictions
  res.json(books);
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => console.log(`Resource Server started on port ${PORT}`));
