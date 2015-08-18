'use strict';

const _ = require('lodash');
const model = require('./users.model');
const controllerUtils = require('../../utils/controllers.utils');
const jwtUtils = require('../../utils/jwt.utils');
const CryptoJS = require('crypto-js');
const config = require('../../config.js');


exports.getAll = function*(next) {
	try{
		let document = yield model.get({});
    document = _.map(document,userDocument=>{
      return _.omit(userDocument.toObject(),'passwd');
    });
		controllerUtils.returnStatus200.call(this,document);
	}catch(err){
		controllerUtils.returnError.call(this,err);
	}
};


exports.create = function*(next) {
	this.type = 'application/json';
	try{
		const timestamp = new Date();
		console.log(this.request.body);
		const email = this.request.body.email;
		const nick = this.request.body.nick || (email.split('@'))[0];

		let existDocument = yield model.get({email:email});
		if(existDocument.length!==0){this.throw('Email already exist.',400);}

		const data = _.merge(this.request.body,{
		  passwd: CryptoJS.HmacSHA1(this.request.body.passwd,config.salt).toString(),
			nick: nick,
			facebookId: null,
			avatar: 'asdas',
		  albums: [],
			created: timestamp,
			modified: timestamp,
			lastLogin: null
		});
		let userDocument = yield model.create(data);
		const object = {
			user: _.omit(userDocument.toObject(),'passwd'),
			token : jwtUtils.createToken(userDocument)
		};
		controllerUtils.returnStatus200.call(this,object);
	}catch(err){
		controllerUtils.returnError.call(this,err);
	}
};

exports.login = function*(next) {
	try{
		const email = this.request.body.email;
		const passwd = this.request.body.passwd;
		if(email === undefined || passwd === undefined) {this.throw('Email and passwd are required.',401);}
		const qry = {'email':email.toLowerCase()};
		let document = yield model.get(qry);
		if(document.length === 0) { this.throw('Email not found',401); }
		document = document[0];

		if(CryptoJS.HmacSHA1(passwd,config.salt).toString()!==document.passwd){this.throw('Invalid passwd.',401);}

		const object = {
			user: _.omit(document.toObject(),'passwd'),
			token : jwtUtils.createToken(document)
		};
		controllerUtils.returnStatus200.call(this,object);
	}catch(err){
		controllerUtils.returnError.call(this,err);
	}
};
