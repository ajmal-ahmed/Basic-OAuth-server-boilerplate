const mongoose = require("mongoose");
var connection_string = process.env.DBURL;
// Makes connection asynchronously. Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(
  connection_string,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, res) {
    if (err) {
      console.log(
        "ERROR connecting to databse: " + connection_string + ". " + err
      );
    } else {
      console.log("DB connection established to: " + connection_string);
    }
  }
);
