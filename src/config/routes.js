/**
 * Main application routes
 */

'use strict';

var mount = require('koa-mount');

module.exports = function(app) {

	// YEOMAN INJECT ROUTES BELOW
	app.use(mount('/api/v1/auth', require('../resources/auth')));
	app.use(mount('/api/v1/users', require('../resources/users')));
	app.use(mount('/api/v1/albums', require('../resources/albums')));
  app.use(mount('/api/v1/', require('../resources/root')));


};
