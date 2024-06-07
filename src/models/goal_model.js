const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal_details: [
    {
      type: { type: String, required: true },
      description: {
        type: String,
      },
      target_value: {
        type: Number,
      },
      current_value: {
        type: Number,
      },
      unit: {
        type: String,
      }, // e.g., "steps", "calories", "hours"
      deadline: {
        type: Date,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
