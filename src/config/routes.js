/**
 * Main application routes
 */

'use strict';

var mount = require('koa-mount');

module.exports = function(app) {

	// YEOMAN INJECT ROUTES BELOW
	app.use(mount('/users', require('../resources/users')));
	app.use(mount('/albums', require('../resources/albums')));
  app.use(mount('/', require('../resources/root')));


};
