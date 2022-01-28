const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../shared/helpers/JWTHelper');

const Login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User incorrect.',
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: 'Inactive user',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Password incorrect',
      });
    }

    const token = await generateJWT(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something was wrong.',
    });
  }
};

module.exports = {
  Login,
};
