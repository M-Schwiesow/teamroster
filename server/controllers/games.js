const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports = {
  getAllGames: function(req,res) {
    console.log("getAllGames found");
    Game.find({}, (err, games) => {
      if(err){
        res.send(err);
      } else {
        res.json(games);
      }
    });
  },

  getGame: function(req,res) {
    console.log("getGame found");
    Game.findById({_id: req.params.id}, function(err, game){
      if(err){
        res.send(err);
      } else {
        res.json(game);
      }
    });
  },

  addGame: function(req,res) {
    console.log("addGame found,", req.body);
    Game.create(req.body, (err, game) =>{ //it occurs to me we don't really use the game parameter.
      if(err){
        let errors=[];
        for(let index in err.errors){
          errors.push(err.errors[index].message);
        }
        console.log("errors from addGame", errors);
        res.json({message: 'error', errors: errors});
      } else {
        res.json(game);
      }
    });
  },

  deleteGame: function(req,res) {
    console.log("deleteGame found,", req.params);
    Game.deleteOne({_id: req.params.id}, (err) =>{
      if(err){
        res.send(err);
      } else {
        res.send(true);
      }
    });
  }

}