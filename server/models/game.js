const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  time: {type: Date, required:[true, "Must provide a gametime."]},
  location: {type: Object}
}, {timestamps: true});

mongoose.model("Game", GameSchema);