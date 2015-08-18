'use strict';

const _ = require('lodash');

exports.returnStatus200 = function(responseBody) {
  responseBody = responseBody || {};
	this.status = 200;
	this.body = responseBody;
};

exports.returnError = function(err) {
  console.log(err);
  err = err || {};
  err.message = err.message || 'Internal server error.';
  err.status = err.status || 500;
	this.status = err.status;
	this.body = { errors: [{status: err.status,title : err.message}] };
};
