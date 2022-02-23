const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product, Role } = require('../models/');

const AllowedCollections = ['users', 'categories', 'products', 'roles'];

const findUsers = async (key = '', res = response) => {
  const isMongoID = ObjectId.isValid(key);

  if (isMongoID) {
    const user = await User.findById(key);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(key, 'i');
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });
  return res.json({
    results: users ? [users] : [],
  });
};

const findCategories = async (key = '', res = response) => {
  const isMongoID = ObjectId.isValid(key);

  if (isMongoID) {
    const category = await Category.findById(key);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(key, 'i');
  const categories = await Category.find({
    $or: [{ name: regex }],
    $and: [{ status: true }],
  });
  return res.json({
    results: categories ? [categories] : [],
  });
};

const findProducts = async (key = '', res = response) => {
  const isMongoID = ObjectId.isValid(key);

  if (isMongoID) {
    const product = await Product.findById(key);
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(key, 'i');
  const products = await Product.find({
    $or: [{ name: regex }],
    $and: [{ status: true }],
  }).populate('category', 'name');
  return res.json({
    results: products ? [products] : [],
  });
};

const findRoles = async (key = '', res = response) => {
  const isMongoID = ObjectId.isValid(key);

  if (isMongoID) {
    const role = await Role.findById(key);
    return res.json({
      results: role ? [role] : [],
    });
  }

  const regex = new RegExp(key, 'i');
  const roles = await Role.find({ role: regex });
  return res.json({
    results: roles ? [roles] : [],
  });
};

const Search = (req = request, res = response) => {
  const { collection, param } = req.params;

  if (!AllowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Allowed collections are: ${AllowedCollections}`,
    });
  }

  switch (collection) {
    case 'users':
      findUsers(param, res);
      break;
    case 'categories':
      findCategories(param, res);
      break;
    case 'products':
      findProducts(param, res);
      break;
    case 'roles':
      findRoles(param, res);
      break;

    default:
      res.status(500).json({
        msg: 'I forgot this search',
      });
      break;
  }
};

module.exports = {
  Search,
};
