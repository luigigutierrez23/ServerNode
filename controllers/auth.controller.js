const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { getJWT, googleVerify } = require('../shared/helpers');
const { EnumRoles } = require('../shared/types/roles');

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

    const token = await getJWT(user.id);

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

const GoogleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //Create user
      const data = {
        name,
        email,
        password: ':P',
        image: picture,
        google: true,
        role: EnumRoles.USER_ROLE,
      };

      user = new User(data);
      await user.save();
    }

    //If db user have status false
    if (!user.status) {
      return res.status(401).json({
        msg: 'Inactive user',
      });
    }

    //Generate JWT
    const token = await getJWT(user.id);

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
  GoogleSignIn,
};
