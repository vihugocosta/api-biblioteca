require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('../models/Author');
const User = require('../models/User');
const Book = require('../models/Book');
const Loan = require('../models/Loan');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/librarydb';

async function reset() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Remove all documents from collections (keeps collection structure)
  await Author.deleteMany({});
  await User.deleteMany({});
  await Book.deleteMany({});
  await Loan.deleteMany({});

  console.log('All collections cleared (documents removed).');
  await mongoose.disconnect();
  console.log('Disconnected.');
}

reset().catch(err => {
  console.error(err);
  process.exit(1);
});
