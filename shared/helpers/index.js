const dbValidators = require('./dbValidators');
const googleVerify = require('./googleVerify');
const jwtValidator = require('./jwtValidator');
const uploadFile = require('./uploadFile');

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwtValidator,
  ...uploadFile,
};
