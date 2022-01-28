const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('tokenKey');

  if (!token) {
    return res.status(401).json({ msg: 'Token not found' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);

    //Read user
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'User not found',
      });
    }

    //Verify if user is active
    if (!user.status) {
      return res.status(401).json({
        msg: 'Inactive user',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token not valid',
    });
  }
};

module.exports = {
  validateJWT,
};
