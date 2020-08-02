var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
});

var users_model = mongoose.model("users", userSchema);

module.exports.get_user = (id) => {
  return users_model.findById(id, "email first_name last_name").lean();
};

module.exports.getUserByEmail = (email) => {
  return users_model.findOne({ email: email }).lean();
};
module.exports.createUser = (data, callback) => {
  let user = new users_model(data);
  user.save((err, dat) => {
    callback(err, dat);
  });
};
