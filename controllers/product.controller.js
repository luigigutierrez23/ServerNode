const { request, response } = require('express');

const { Product, Category } = require('../models');

const GetProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products, user] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);

  res.json({
    total,
    products,
    user,
  });
};

const GetProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, status: true })
    .populate('user', 'name')
    .populate('category', 'name');

  if (!product) {
    return res.status(404).json({
      msg: 'Deleted product',
    });
  }

  if (!product.avaliable) {
    return res.status(404).json({
      msg: 'Product is not avaliable',
    });
  }

  res.json(product);
};

const CreateProduct = async (req = request, res = response) => {
  const { category, name, price, description } = req.body;

  try {
    const productDB = await findProduct(name);
    if (productDB.found) {
      return res.status(400).json({
        msg: `Product: ${name} is already registered.`,
      });
    }

    const categoryDB = await findCategory(category);
    if (!categoryDB.found) {
      return res.status(400).json({
        msg: `Category: ${category} doesn't exist .`,
      });
    }

    //Generate data
    const data = {
      name,
      price,
      description,
      user: req.user._id,
      category: categoryDB._id,
    };

    //Save in database
    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong.',
    });
  }
};

const EditProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const { category, avaliable, status, price, description, name, ...data } =
    req.body;

  try {
    //Validate name
    const productFound = await findProduct(name);
    if (productFound.found && productFound._id.toString() !== id.toString()) {
      return res.status(400).json({
        msg: `Name: ${productFound.name} is already exist`,
      });
    }

    const categoryFound = await findCategory(category);
    if (!categoryFound.found) {
      return res.status(400).json({
        msg: `Category: ${category} doesn't exist .`,
      });
    }

    data.category = categoryFound._id;
    data.user = req.user._id;

    const product = {
      name,
      status,
      category: data.category,
      avaliable,
      price,
      description,
    };

    // Save changes
    const productDB = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.json(productDB);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong',
    });
  }
};

const DeleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    //Change status false and keep the record.
    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong',
    });
  }
};

const findCategory = async (name) => {
  const categoryDB = await Category.findOne({
    name: name.toUpperCase(),
    status: true,
  });

  if (!categoryDB) {
    return { found: false, _id: null };
  }

  return { found: true, _id: categoryDB._id };
};

const findProduct = async (name) => {
  const productDB = await Product.findOne({
    name: name,
    status: true,
  });

  if (!productDB) {
    return { found: false, _id: null, name: null };
  }

  return { found: true, _id: productDB._id, name: productDB.name };
};

module.exports = {
  GetProduct,
  GetProducts,
  CreateProduct,
  EditProduct,
  DeleteProduct,
};
