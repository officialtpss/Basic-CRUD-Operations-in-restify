'use strict';

const userRouter = require('./users.router');

module.exports = function(server) {

  userRouter.applyRoutes(server);

};