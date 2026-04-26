const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: String,
  roll: String,
  year: String,
  degree: String,
  role: String,
  email: String,
  project: String,
  hobbies: String,
  certificate: String,
  internship: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Member', MemberSchema);