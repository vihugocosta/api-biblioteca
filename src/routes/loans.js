const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

async function routes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      const { userId, bookId } = request.body;
      if (!userId || !bookId) return reply.code(400).send({ message: 'userId and bookId required' });

      const user = await User.findById(userId);
      if (!user) return reply.code(404).send({ message: 'User not found' });

      const book = await Book.findById(bookId);
      if (!book) return reply.code(404).send({ message: 'Book not found' });

      const now = new Date();

      // Check availability
      if (!book.isAvailable) {
        // if expectedReturnDate exists and is before now, allow (book overdue)
        if (!book.expectedReturnDate || (new Date(book.expectedReturnDate) > now && book.expectedReturnDate !== null)) {
          return reply.code(400).send({ message: 'Book is currently borrowed and not available.' });
        }
        // else expectedReturnDate is before now -> allow
      }

      // proceed with loan
      const expected = addDays(now, 3);
      const loan = new Loan({
        user: user.name,
        book: book.title,
        loanDate: now.toISOString(),
        returnDate: null
      });
      await loan.save();

      book.isAvailable = false;
      book.expectedReturnDate = expected;
      await book.save();

      return reply.code(201).send({ loan, expectedReturnDate: expected });
    } catch (err) {
      return reply.code(500).send({ message: err.message });
    }
  });

  fastify.get('/', async (request, reply) => {
    const loans = await Loan.find().sort({ loanDate: -1 });
    return loans;
  });
}

module.exports = routes;
