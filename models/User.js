const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  bar: {
    type: String,
    required: true
  },
  wageHour: {
    type: Number,
    default: 5.5
  }
});

module.exports = mongoose.model('User', UserSchema);
