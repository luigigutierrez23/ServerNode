const { request, response } = require('express');

const { Category } = require('../models');

const GetCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories, user] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name'),
  ]);

  res.json({
    total,
    categories,
    user,
  });
};

const GetCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findOne({ _id: id, status: true }).populate(
    'user',
    'name'
  );

  if (!category) {
    return res.status(404).json({
      msg: 'Deleted category',
    });
  }

  res.json(category);
};

const CreateCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
      return res.status(400).json({
        msg: `Category: ${name} is already registered.`,
      });
    }

    //Generate data
    const data = {
      name,
      user: req.user._id,
    };

    //Save in database
    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong.',
    });
  }
};

const EditCategory = async (req = request, res = response) => {
  const id = req.params.id;
  const { status, user, ...data } = req.body;

  try {
    data.name = data.name.toUpperCase();
    //Validate name
    existName = await Category.findOne({ name: data.name });

    if (existName && existName._id.toString() !== id.toString()) {
      return res.status(400).json({
        msg: 'Name is already exist',
      });
    }

    data.user = req.user._id;

    // Save changes
    const categoryDB = await Category.findByIdAndUpdate(
      id,
      { name: data.name, status },
      { new: true }
    );
    res.json(categoryDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong',
    });
  }
};

const DeleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    //Change status false and keep the record.
    const category = await Category.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong',
    });
  }
};

module.exports = {
  GetCategories,
  GetCategory,
  CreateCategory,
  EditCategory,
  DeleteCategory,
};
