const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  birthDate: { type: Date, required: true },
  sex: { type: String },
  writingGenre: { type: String, enum: ['Novel','Poetry','Fantasy','Fiction','Mystery','Suspense'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema);
