'use strict';

const _ = require('lodash');
const model = require('./users.model');
const controllerUtils = require('../../utils/controllers.utils');


exports.getAll = function*(next) {
	try{
		const user = parseInt(this.request.header['auth-x']);
		const qry = {'users.id':user};
		let document = yield model.get(qry);
    document = _.map(document,userDocument=>{
      return _.omit(userDocument.toObject(),'passwd');
    });
		controllerUtils.returnStatus200.call(this,document);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};


exports.create = function*(next) {
	this.type = 'application/json';
	try{
		const user = parseInt(this.request.header['auth-x']);
		const timestamp = new Date();
		const data = _.merge(this.request.body,{
		  passwd: 'asda322sad', //codificar
		  albums: [],
			created: timestamp,
			modified: timestamp,
			lastLogin: null
		});
		let userDocument = yield model.create(data);
		userDocument = _.omit(userDocument.toObject(),'passwd');
		controllerUtils.returnStatus200.call(this,userDocument);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};
