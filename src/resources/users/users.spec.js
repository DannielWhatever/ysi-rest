'use strict';

const app = require('../../server');
const request = require('supertest').agent(app.listen());

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();


describe('GET /users', function(){
  it('should respond with 200 type Array', done =>{
    request
    .get('/users')
    .expect(200, (err, res)=>{
    	expect(Array.isArray(res.body)).to.be.true;
    	done();
    });
  });
});
