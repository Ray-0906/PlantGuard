const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  disease: { type: String, required: true },
  cure: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Plant = mongoose.model('Plant', plantSchema);
module.exports = { Plant };
