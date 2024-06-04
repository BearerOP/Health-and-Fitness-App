const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  goal_details: {
    description: String,
    target_value: Number,
    current_value: Number,
    unit: String // e.g., "steps", "calories", "hours"
  },
  deadline: Date,
  created_at: { type: Date, default: Date.now }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
