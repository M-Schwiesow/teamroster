const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  time: {type: Date, required:[true, "Must provide a gametime."]},
  club: {type: String, required:[true, "Must specify a club."]},
  field: {type: String},
  player_status: {type: Array, default:[]}, //storing these as objects in array { player: Player, status: string }  Better to create this as a model?
}, {timestamps: true});

mongoose.model("Game", GameSchema);