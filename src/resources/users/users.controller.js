'use strict';

const _ = require('lodash');
const moment = require('moment');
const model = require('./users.model');
const controllerUtils = require('../../utils/controllers.utils');
const jwtUtils = require('../../utils/jwt.utils');


exports.getAll = function*(next) {
	try{
		let document = yield model.get({});
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
		const timestamp = moment().unix();
		console.log(this.request.body);
		const data = _.merge(this.request.body,{
		  passwd: 'asda322sad', //codificar
			facebookId: null,
			avatar: 'asdas',
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

exports.login = function*(next) {
	try{
		const email = this.request.body.email;
		const passwd = this.request.body.passwd;
		if(email === undefined || passwd === undefined) {throw new Error('Email and passwd are required.');}
		const qry = {'email':email.toLowerCase()};
		let document = yield model.get(qry);
		if(document.length === 0) {throw new Error('Email not found.');}
		document = document[0];
		console.log('here, return token');
		const object = {
			user: _.omit(document.toObject(),'passwd'),
			token : jwtUtils.createToken(document)
		};
		controllerUtils.returnStatus200.call(this,object);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};
