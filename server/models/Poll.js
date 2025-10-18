const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [{
    q: String,
    options: [String],
    type: { type: String, enum: ['bar', 'pie', 'doughnut'], default: 'bar' },
    votes: [{ type: Number, default: 0 }]  // Array for option votes
  }]
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);