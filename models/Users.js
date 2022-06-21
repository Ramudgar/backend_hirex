
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'employee',
  enum: ["Startup", "investor", "employee"]
 },
 username: {
    type: String,
    required: true,
 },
 accessToken: {
  type: String
 }
});
 
const User = mongoose.model('user', UserSchema);
 
module.exports = User;