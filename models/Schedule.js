const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  event: {
    type: String,
    required: true
  },
  inDate: {
    type: Date,
    required: true
  },
  outDate: {
    type: Date,
    required: true
  },
  workHours: {
    type: String
  },
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  prep: {
    type: Boolean,
    default: false
  }
});

// Call getAverageCost after save
ScheduleSchema.pre('save', function() {
  this.workHours = this.outDate.getTime() - this.inDate.getTime();

  this.year = this.outDate.getUTCFullYear();
  this.month = this.outDate.getUTCMonth() + 1;
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
