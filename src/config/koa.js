/**
 * Koa config
 */

'use strict';

var config = require('./environment');
var koaBody = require('koa-body');
var morgan = require('koa-morgan');
var cors = require('kcors');
var auth = require('../middlewares/auth');

module.exports = function(app) {

  // BodyParser
  app.use(koaBody());

  //Cors
  app.use(cors());

  // Logger
  app.use(morgan.middleware(config.logType));

  //Auth
  app.use(auth());

};
