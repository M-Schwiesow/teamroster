const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Player = mongoose.model('Player');

module.exports = {
  getAllGames: function(req,res) {
    Game.find({}, (err, games) => {
      if(err){
        res.send(err);
      } else {
        res.json(games);
      }
    });
  },

  getGame: function(req,res) {
    console.log("getGame found with parameter:",req.params);
    Game.findById({_id: req.params.id}, function(err, game){
      if(err){
        res.send(err);
      } else {
        res.json(game);
      }
    });
  },

 
  addGame: function(req,res) {
    console.log("addGame found, req.body:");
    console.log(req.body);
    const _game = req.body;
    //need to pull current players and add them to the game
    Player.find({}, function(err,players){
      if(err){
        console.log("error finding players in addGame",err);
        //and next?  we want to register our players to the game!
      } else {
        _game.player_status = [];
        //for grins, you could probably use this Array.from method to create
        //your array from the list of players.
        //something like _game.player_status = Array.from(players, (v, i) => {
          // hmm, breaks down here.  have to look up the syntax
        // });
        // console.log(Array.from({length: 5}, (v,i=1) => i+1));
        //add each player to the new game's status
        for(let player of players){
          _game.player_status.push({ "player" : player, "status" : "absent" });
        }
      }
    });
    Game.create(_game, (err, game) =>{
      if(err){
        let errors=[];
        for(let index in err.errors){
          errors.push(err.errors[index].message);
        }
        console.log("errors from addGame, Game.create:", errors);
        res.json({message: 'error', errors: errors});
      } else {
        //potential data risk, probably want to set player_status before checking for errors.  how do?
        game.player_status = _game.player_status; //had to do this, mongoose was not looking into the array.  learn more.
        game.markModified("player_status");
        game.save();
        console.log("success in addGame, game obj:");
        console.log(game);
        res.json(game);
      }
    });
  },

  editGame: function(req,res) {
    Game.findByIdAndUpdate(req.params.id, req.body, (err, game) =>{
      if(err){
        let errors=[];
        for(let index in err.errors){
          errors.push(err.errors[index].message);
        }
        console.log("errors from editGame:", errors);
        res.json({message: 'error', errors: errors});
      } else {
        console.log("success in editGame, game obj:");
        console.log(game);
        res.json(game);
      }
    })
  },

  deleteGame: function(req,res) {
    console.log("deleteGame found, req.params:", req.params);
    Game.deleteOne({_id: req.params.id}, (err) =>{
      if(err){
        res.send(err);
      } else {
        res.send(true);
      }
    });
  }

}