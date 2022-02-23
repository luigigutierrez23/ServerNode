const { response, request } = require('express');
const { EnumRoles } = require('../shared/types/roles');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Trying to verify role whitout verifying the user',
    });
  }

  const { role, name } = req.user;
  if (role !== EnumRoles.ADMIN_ROLE) {
    return res.status(401).json({
      msg: `${name} doesn't have admin role`,
    });
  }
  next();
};

const isRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Trying to verify role whitout verifying the user',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `Services require this roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  isRole,
};
