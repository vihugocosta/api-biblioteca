const Author = require('../models/Author');

async function routes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      const { name, birthDate, sex, writingGenre } = request.body;
      const author = new Author({ name, birthDate, sex, writingGenre });
      await author.save();
      return reply.code(201).send(author);
    } catch (err) {
      if (err.code === 11000) {
        return reply.code(400).send({ message: 'Author with this name already exists.' });
      }
      return reply.code(500).send({ message: err.message });
    }
  });

  fastify.get('/', async (request, reply) => {
    const authors = await Author.find().sort({ name: 1 });
    return authors;
  });
}

module.exports = routes;
