require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const cors = require('fastify-cors');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/librarydb';

// register plugins
fastify.register(cors);

// connect mongoose
mongoose.connect(MONGO_URI, { })
  .then(() => fastify.log.info('MongoDB connected'))
  .catch(err => {
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1);
  });

// register routes
fastify.register(require('./routes/authors'), { prefix: '/authors' });
fastify.register(require('./routes/users'), { prefix: '/users' });
fastify.register(require('./routes/books'), { prefix: '/books' });
fastify.register(require('./routes/loans'), { prefix: '/loans' });

// start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
