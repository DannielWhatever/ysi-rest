'use strict';

var app = require('../../server');
var request = require('supertest').agent(app.listen());

var expect = require('chai').expect;
var should = require('should');


describe('GET /albums', function(){
  it('should respond with 200 type Array', done => {
    request
    .get('/albums')
    .set('auth-x','1')
    .expect(200, (err, res) => {
    	should(res.body).be.an.instanceOf(Array);
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
      should(res.body).not.be.an.instanceOf(Array);
      should(res.body).have.property('title');
      should(res.body).not.have.property('passwd');
    	done();
    });
  });


});
