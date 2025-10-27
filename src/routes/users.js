const User = require('../models/User');

async function routes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      const { name, birthDate, sex, address } = request.body;
      const user = new User({ name, birthDate, sex, address });
      await user.save();
      return reply.code(201).send(user);
    } catch (err) {
      if (err.code === 11000) {
        return reply.code(400).send({ message: 'User with this name already exists.' });
      }
      return reply.code(500).send({ message: err.message });
    }
  });

  fastify.get('/', async (request, reply) => {
    const users = await User.find().sort({ name: 1 });
    return users;
  });
}

module.exports = routes;
