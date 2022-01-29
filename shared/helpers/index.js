const dbValidators = require('./dbValidators');
const googleVerify = require('./googleVerify');
const jwtValidator = require('./jwtValidator');

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwtValidator,
};
