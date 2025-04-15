const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  creatorId: String,
  brandId: String,
  amount: Number,
  invoiceUrl: String,
  status: { type: String, default: 'sent' },
  timestamp: Date,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
