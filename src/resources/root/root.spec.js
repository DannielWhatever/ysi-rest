'use strict';

const app = require('../../server');
const request = require('supertest').agent(app.listen());

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();


describe('GET /', function(){
  it('should respond with 403', done => {
    request
    .get('/')
    .expect(403, done);
  });
});
