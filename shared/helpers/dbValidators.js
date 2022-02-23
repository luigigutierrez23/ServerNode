const Role = require('../../models/role.model');
const { User, Category, Product } = require('../../models');

const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role: ${role} is not registered in database`);
  }
};

//Verify if email exist.
const existEmail = async (email = '') => {
  const exist = await User.findOne({ email });

  if (exist) {
    throw new Error(`Email: ${email} is already registered.`);
  }
};

//Verify if user exist.
const existUserById = async (id = '') => {
  const exist = await User.findById(id);

  if (!exist) {
    throw new Error(`User id: ${id} doesn't exist.`);
  }
};

//Verify if category exist.
const existCategoryById = async (id = '') => {
  const exist = await Category.findById(id);

  if (!exist) {
    throw new Error(`Category id: ${id} doesn't exist.`);
  }
};

//Verify if product exist.
const existProductById = async (id = '') => {
  const exist = await Product.findById(id);

  if (!exist) {
    throw new Error(`Product id: ${id} doesn't exist.`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  existUserById,
  existCategoryById,
  existProductById,
};
