'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = mongoose.model('User',new Schema({
  email: {type:String, require:true},
  passwd: String,
  facebookId: String,
  nick: String,
  avatar: String,
  albums: Array,
  created: Date,
  modified: Date,
  lastLogin: Date
}));


exports.create = function(data){
  return new Promise((resolve, reject) => {
    new UserSchema(data).save((err, document) => {
      if (err) { reject(err); }
      resolve(document);
    });
  });
};

exports.get = function(qry){
  return UserSchema.find(qry)
  .then( x => x )
  .catch( err => {
    console.log(err);
    return Promise.reject(err);
  });
};
