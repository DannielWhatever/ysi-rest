'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.token);
};
