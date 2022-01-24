const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const GetUser = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const users = await User.find().skip(Number(from)).limit(Number(limit));

  res.json({
    users,
  });
};

const PostUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Save user
  await user.save();
  res.json({
    user,
  });
};

const PutUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...user } = req.body;

  //TODO: Valid with DB
  if (password) {
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
  }

  //Save changes
  const userDB = await User.findByIdAndUpdate(id, user);
  res.json(userDB);
};

const DeleteUser = (req = request, res = response) => {
  res.json({
    message: 'delete API - Controller',
  });
};

const PatchUser = (req = request, res = response) => {
  res.json({
    message: 'patch API - Controller',
  });
};

module.exports = {
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
  PatchUser,
};
