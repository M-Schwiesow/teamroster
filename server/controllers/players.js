const mongoose = require('mongoose');
const Player = mongoose.model('Player');

module.exports = {
  getAllPlayers: function(req, res)  {
    Player.find({}, (err, players) =>{
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.json(players);
      }
    });
  },

  getPlayer: function(req,res) {
    Player.findById({_id: req.params.id}, function(err, player) {
      if(err){
        res.send(err);
      } else {
        res.json(player);
      }
    });
    },

    /*Need to add all games to a new player.
    On success, pull games from DB and loop through,
    setting status to undecided for each game.
    Look into projections to pull the id of the game. */
    addPlayer: function(req,res) {
      Player.create(req.body, (err, player) => {
        if(err){
          let errors=[];
          for(let index in err.errors){
            errors.push(err.errors[index].message);
          }
          console.log("errors from addPlayer", errors);
          res.json({message: 'error', errors: errors});
        } else {
          res.json(player);
        }
      });
    },

    updatePlayer: function(req,res) {
      const opts = {runValidators: true};
      
      Player.findByIdAndUpdate(req.params.id, req.body, opts, (err, response)=>{
        if(err){
          let errors=[];
          for(let index in err.errors){
            errors.push(err.errors[index].message);
          }
          console.log("errors in updatePlayer", errors);
          res.json({message: 'error', errors: errors});
        } else {
          res.send(true);
        }
      });
    },

    deletePlayer: function(req,res) {
      console.log("deletePlayer function", req.params.id);
      console.log(req.params);
      Player.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
          res.send(err);
        } else {
          res.send(true);
        }
      });
    }

  }