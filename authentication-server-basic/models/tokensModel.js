var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  access_token: { type: String },
  refresh_token: { type: String },
  eat: { type: Date },
  user_id: { type: Schema.Types.ObjectId },
});

var tokens_model = mongoose.model("tokens", tokenSchema);

module.exports.newToken = (data, callback) => {
  let token = new tokens_model(data);
  token.save((err, dat) => {
    callback(err, dat);
  });
};

module.exports.getTokenByRefreshtoken = (refresh_token) => {
  return tokens_model.findOne({ refresh_token: refresh_token }).lean();
};
module.exports.getTokenByAccesstoken = (access_token) => {
  return tokens_model.findOne({ access_token: access_token }).lean();
};

module.exports.update = function (id, data, callback) {
  tokens_model.findByIdAndUpdate(id, data, { new: true }, callback);
};
