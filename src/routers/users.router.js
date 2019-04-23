/**
 * Module Dependencies
 */
const Router = require('restify-router').Router;
const routerInstance = new  Router();
const Joi = require('joi');

/**
 * Module Controllers
 */
const userController = require('../modules/users');

/**
 * Middleware schema Validator
 */
const validator = require('../middleware/schema-validator');

const loginSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

const registerSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
};

const updateSchema = {
  password: Joi.string().optional(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  userId: Joi.string().required(),
};

routerInstance.get('/v1/users', userController.getAll);
routerInstance.post('/v1/users', validator(registerSchema),  userController.create);
routerInstance.put('/v1/users', validator(loginSchema),  userController.login);
routerInstance.get('/v1/users/:userId', userController.getUser);
routerInstance.patch('/v1/users/:userId', validator(updateSchema), userController.updateUser);
routerInstance.del('/v1/users/:userId', userController.deleteUser);

module.exports = routerInstance;