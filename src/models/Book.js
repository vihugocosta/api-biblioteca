const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  synopsis: { type: String },
  year: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  isAvailable: { type: Boolean, default: true },
  expectedReturnDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
