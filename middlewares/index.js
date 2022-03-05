const fieldValidator = require('./fieldValidator');
const fileValidator = require('./fileValidator');
const jwtValidator = require('./jwtValidator');
const roleValidator = require('./roleValidator');

module.exports = {
  ...fieldValidator,
  ...fileValidator,
  ...jwtValidator,
  ...roleValidator,
};
