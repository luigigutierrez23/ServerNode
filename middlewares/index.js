const fieldValidator = require('./fieldValidator');
const jwtValidator = require('./jwtValidator');
const roleValidator = require('./roleValidator');

module.exports = {
  ...fieldValidator,
  ...jwtValidator,
  ...roleValidator,
};
