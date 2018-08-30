const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
mongoose.Promise = global.Promise;

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true
};

const mongoURI = 'mongodb://localhost:27017/teamroster';

mongoose.connect(mongoURI,option);

const models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});