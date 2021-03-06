'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');
const usersModel = require('../resources/users/users.model');

function auth(opts) {
  opts = opts || {};
  return function*(next){
    try{
      if( (this.request.url==='/api/v1/users/' && this.request.method==='POST') ||
          (this.request.url==='/api/v1/users/login' && this.request.method==='POST')
      ){
        yield* next;
      }
      else{
        console.log(this.request);
        console.log('apply auth, if is true, yield*, else , set status and body');

        const authHeader = this.request.headers.authorization;

        if(!authHeader) { this.throw('Header authorization is required.',401);}
        const token = authHeader.split(' ')[1];
        const payload = jwt.decode(token, config.token);

        if(payload.exp <= moment().unix()) { this.throw('The token expired.',401);}

        const document = yield usersModel.get({_id:payload.sub});
        if(document.length === 0) {this.throw('User not found.',401);}

        this.request.user = payload.sub;
        yield* next;
      }
    }catch(err){
    	console.log(err);
    	this.status = 401;
      this.body = {
        errors: [{status: 401,title : 'Unauthorized'}]
      };
  	}

  };
}


module.exports = auth;
