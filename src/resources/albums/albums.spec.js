'use strict';

var app = require('../../server');
var request = require('supertest').agent(app.listen());

var expect = require('chai').expect;
var should = require('chai').should();


describe('GET /albums', function(){
  it('should respond with 200 type Array', done => {
    request
    .get('/albums')
    .set('auth-x','1')
    .expect(200, (err, res) => {
    	(res.body).should.be.an.instanceof(Array);
    	done();
    });
  });
});

describe('GET /albums', function(){
  it('should respond with 200 type Object', done => {
    request
    .get('/albums/55cbf02af82ee1f2125bcb38')
    .set('auth-x','1')
    .expect(200, (err, res) => {
      (res.body).should.not.be.an.instanceof(Array);
      (res.body).should.have.property('title');
      (res.body).should.not.have.property('passwd');
    	done();
    });
  });


});
