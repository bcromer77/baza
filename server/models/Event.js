// server/models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  ticketPrice: { type: Number },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
