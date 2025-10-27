const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: { type: String, required: true },
  book: { type: String, required: true },
  loanDate: { type: String, required: true },
  returnDate: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
