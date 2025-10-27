const Book = require('../models/Book');
const Author = require('../models/Author');

async function routes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      const { title, synopsis, year, author } = request.body;
      // ensure author exists
      const a = await Author.findById(author);
      if (!a) return reply.code(400).send({ message: 'Author not found' });

      const book = new Book({ title, synopsis, year, author });
      await book.save();
      return reply.code(201).send(await book.populate('author'));
    } catch (err) {
      return reply.code(500).send({ message: err.message });
    }
  });

  fastify.get('/', async (request, reply) => {
    const books = await Book.find().populate('author').sort({ title: 1 });
    return books;
  });
}

module.exports = routes;
