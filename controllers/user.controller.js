const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const GetUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const GetUser = async (req = request, res = response) => {
  const { id } = req.params;

  const user = await User.findOne({ id });
  res.json(user);
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

const DeleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  //Change status false and keep the record.
  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json(user);
};

module.exports = {
  GetUsers,
  GetUser,
  PostUser,
  PutUser,
  DeleteUser,
};
