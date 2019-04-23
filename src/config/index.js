'use strict';
module.exports = {
  name: 'API',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://0.0.0.0:3000',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/api-restify',
  },
};