const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: {type: String, required:[true, "Player must have a name!"], maxLength:[45, "Name must be shorter than 45 characters."]},
  pref_position: {type: String, required:[false], maxlength:[15, "Position name must not exceed 15 characters."]}
}, {timestamps: true});

mongoose.model("Player", PlayerSchema);