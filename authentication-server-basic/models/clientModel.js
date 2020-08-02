var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  client_name: { type: String },
  clientId: { type: String },
  clientSecret: { type: String },
});

var clients_model = mongoose.model("clients", clientSchema);

module.exports.register = (data, callback) => {
  let clients = new clients_model(data);
  clients.save((err, dat) => {
    callback(err, dat);
  });
};

module.exports.getByclientId = (clientId) => {
  return clients_model.findOne({ clientId: clientId }).lean();
};
