'use strict';

const _ = require('lodash');
const model = require('./albums.model');


exports.getAll = function*(next) {
	try{
		let document = yield model.get({});
    document = _.map(document,album=>{
      return _.omit(album.toObject(),'passwd');
    });
		this.status = 200;
		this.body = document;
	}catch(err){
		console.log(err);
		this.status = 500;
		this.body = {
			errors: [{status: 500,title : 'No se pudo encontrar el registro'}]
		};
	}
};

exports.get = function*(next) {
	console.log(this.params.albumId);
	try{
		const qry = {_id:this.params.albumId};
		let document = yield model.get(qry);
    document = _.omit(document[0].toObject(),'passwd');
		this.status = 200;
		this.body = document;
	}catch(err){
		console.log(err);
		this.status = 500;
		this.body = {
			errors: [{status: 500,title : 'No se pudo encontrar el registro'}]
		};
	}
};

exports.delete = function*(next) {
	console.log(this.params.albumId);
	try{
		const qry = {_id:this.params.albumId};
		let document = yield model.delete(qry);
    console.log(document);
		this.status = 200;
		this.body = document;
	}catch(err){
		console.log(err);
		this.status = 500;
		this.body = {
			errors: [{status: 500,title : 'No se pudo eliminar el registro'}]
		};
	}
};


exports.save = function*(next) {
	this.type = 'application/json';
	try{
		const timestamp = new Date();
		const data = _.merge(this.request.body,{
			users: [{id:1,permission:'admin'}], //TODO: take user from header
			pictures: [],
			created: timestamp,
			modified: timestamp,
			cover: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' /** TODO: add example cover */
		});
		let album = yield model.create(data);
		album = _.omit(album.toObject(),'passwd');
		this.status = 200;
		this.body = album;
	}catch(err){
		console.log(err);
		this.status = 500;
		this.body = {
			errors: [{status: 500, title : 'No se pudo crear el registro'}]
		};
	}
};
