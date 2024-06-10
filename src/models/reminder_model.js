const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reminder_info: [
    {
      type: { type: String, required: true },
      message: {
        type: String,
      },
      time: { type: Date, required: true },
      repeat: { type: String },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports = Reminder;
