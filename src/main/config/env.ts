export default {
  jwtSecret: process.env.SECRET || 'SECRET',

  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',

  port: process.env.PORT || 3333,
};
