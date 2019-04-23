const Joi = require('joi');
module.exports = (schemaObject) => {
  return (req, res, next) => {
    const payload = Object.assign({}, req.params || {}, req.query || {}, req.body || {});
    Joi.validate(payload, Joi.object().keys(schemaObject), (err) => {
      if (err) {
        res.send(400, { message: errorHandler(err) });
      } else { next(err); }
    });
  };
};

const errorHandler = (err) => {
  // eslint-disable-next-line prefer-const
  let error = [];
  for (const x in err.details) {
    error.push(err.details[x].message);
  }
  return error;
};

