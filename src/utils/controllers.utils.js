'use strict';

const _ = require('lodash');


exports.returnError500 = function(err,msg) {
  msg = msg || 'Internal server error.';
	console.log(err);
	this.status = 500;
	this.body = {
		errors: [{status: 500,title : msg}]
	};
};

exports.returnStatus200 = function(responseBody) {
  responseBody = responseBody || {};
	this.status = 200;
	this.body = responseBody;
};
