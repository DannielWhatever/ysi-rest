var mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function(db) {
   mongoose.connect(db);
   mongoose.connection.on('error', () => console.error('Error connecting to: '+db));
   mongoose.connection.once('open', () => console.log('Connected to: '+db));
   return mongoose.connection;
}
