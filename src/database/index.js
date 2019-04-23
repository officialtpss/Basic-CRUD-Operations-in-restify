'use strict';
const mongoose = require('mongoose');
module.exports = (config, app) => {
  mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      throw (err);
    } else {
      require('./../models')(mongoose);
      require('./../routers')(app);
    }
  });
};
