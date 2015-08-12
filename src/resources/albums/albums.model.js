'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AlbumSchema = mongoose.model('Album',new Schema({
  title: {type:String, require:true},
  passwd: String,
  users: Array,
  pictures: Array,
  cover: String,
  created: Date,
  modified: Date
}));

exports.create = function(data){
  return new Promise((resolve, reject) => {
    new AlbumSchema(data).save((err, document) => {
      if (err) { reject(err); }
      resolve(document);
    });
  });
};

exports.get = function(qry){
  return AlbumSchema.find(qry)
  .then( x => x )
  .catch( err => {
    console.log(err);
    return Promise.reject(err);
  });
};

exports.delete = function(qry){
  return AlbumSchema.find(qry).remove()
  .then( x => x )
  .catch( err => {
    console.log(err);
    return Promise.reject(err);
  });
};
