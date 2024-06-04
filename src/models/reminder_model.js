const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
  repeat: { type: String } // e.g., "daily", "weekly"
});

const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
