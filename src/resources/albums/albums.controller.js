'use strict';

const _ = require('lodash');
const moment = require('moment');
const model = require('./albums.model');
const controllerUtils = require('../../utils/controllers.utils');


exports.getAll = function*(next) {
	try{
		const qry = {'users.id':this.request.user};
		let document = yield model.get(qry);
    document = _.map(document,album=>{
      return _.omit(album.toObject(),'passwd');
    });
		controllerUtils.returnStatus200.call(this,document);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};

exports.get = function*(next) {
	console.log(this.params.albumId);
	try{
		const qry = {'users.id':this.request.user,_id:this.params.albumId};
		let document = yield model.get(qry);
		if(document.length!==0){
				document = _.omit(document[0].toObject(),'passwd');
		}
		controllerUtils.returnStatus200.call(this,document);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};

exports.delete = function*(next) {
	try{
		const qry = {'users.id':this.request.user,_id:this.params.albumId};
		let document = yield model.delete(qry);
		controllerUtils.returnStatus200.call(this,document);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};


exports.create = function*(next) {
	this.type = 'application/json';
	try{
		const timestamp = moment().unix(); //new Date();
		const data = _.merge(this.request.body,{
			users: [{id:this.request.user,permission:'admin'}],
			pictures: [],
			created: timestamp,
			modified: timestamp,
			cover: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' /** TODO: add example cover */
		});
		let album = yield model.create(data);
		album = _.omit(album.toObject(),'passwd');
		controllerUtils.returnStatus200.call(this,album);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};


exports.uploadPicture = function*(next) {
	this.type = 'application/json';
	try{
		const qry = {'users.id':this.request.user,_id:this.params.albumId};
		const data = _.merge(this.request.body,{
			id: 'shalalala',
			updated: moment().unix()
		});
		let album = yield model.uploadPicture(qry, data);
		album = _.omit(album.toObject(),'passwd');
		controllerUtils.returnStatus200.call(this,album);
	}catch(err){
		controllerUtils.returnError500.call(this,err);
	}
};
