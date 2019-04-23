'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { getErrorMessage } = require('./../handler/error.handler');
const user = mongoose.model('users');

// create new user
const create = async (req, reply) => {
  const doc = new user(req.body);
  try {
    await doc.save();
    return reply.send(201, {ok: 1});
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};

// login user
const login = async (req, reply) => {
  try {
    const data = await user.findOne(req.body, { password: 0 }).exec();
    if (!data) {
      return reply.send(400, { message: 'invalid email or password' });
    } else {
      reply.send(data);
    }
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};

// get information of user
const getUser = async (req, reply) => {
  try {
    const data = await user.findOne({ _id: req.params.userId }, { password: 0 }).exec();
    return reply.send(data);
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};

// get information of  all useruser
const getAll = async (req, reply) => {
  try {
    const data = await user.find({}, { password: 0 }).exec();
    return reply.send(data);
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};


// update user information
const updateUser = async (req, reply) => {
  try {
    await user.updateOne({ _id: req.params.userId }, req.body).exec();
    return reply.send(202, { ok: 1 });
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};

// delete user
const deleteUser = async (req, reply) => {
  try {
    await user.deleteOne({ _id: req.params.userId }).exec();
    return reply.send(200, { ok: 1 });
  } catch (e) {
    return reply.send(400, { message: getErrorMessage(e) });
  }
};

module.exports = {
  create,
  login,
  getUser,
  getAll,
  updateUser,
  deleteUser,
};