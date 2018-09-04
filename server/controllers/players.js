const mongoose = require('mongoose');
const Player = mongoose.model('Player');
const Game = mongoose.model('Game');

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

    //on adding a new player, need to append that player's status to all games
    addPlayer: function(req,res) {
      Player.create(req.body, (err, player) => {
        if(err){
          let errors=[];
          for(let index in err.errors){
            errors.push(err.errors[index].message);
          }
          console.log("errors from addPlayer, Player.create:", errors);
          res.json({message: 'error', errors: errors});
        } else { //on success, send response to client and begin a magical journey to register the player for all games.

          res.json(player);
          // const base_status = {
          //   "player" : player,
          //   "status" : "absent"
          // }
          /*
            BEWARE: mongoose cannot track changes to an array and will not save said changes.
            use .markModified('<attributeName>') before saving .save()
            probably need to modify our process below!
            could the fix be as simple as using markModified in our loop?
            almost that simple!  Needed to save, those updates didn't make it to the update method =/
          */
          Game.find({}, (err, games) => { //pull all games for update
            if(err){
              console.log("find game error in addPlayer", err);
            } else {
              console.log("success on Game.find in addPlayer, tracking");
              console.log("I only want to long the change once....");
              //attempting to add the player to status array
              games.forEach(function(game){
                console.log("game.player_status before:", game.player_status.length);
                game.player_status.push({"player" : player , "status" : "absent"});
                console.log("game.player_status after:", game.player_status.length);
                game.markModified("player_status");
                //okay, this works but it made the server chug a bit.  gotta be a better way, eh?
                game.save(function(err,response){
                  if(err){
                    console.log("error on game.save in addPlayer:",err);
                  } else {
                    console.log("response from game.save in addPlayer:", response);
                  }
                });
              });
            }
          });
        } //end Player.create success path
      });
    }, //end addPlayer()

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
    //add a check to remove player from all Games
    deletePlayer: function(req,res) {
      console.log("deletePlayer function, req.params.id:", req.params.id);

      Player.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
          console.log("error in deletePlayer: ", err);
          res.send(err);
        } else {
          console.log("success in deletePlayer");
          res.send(true);
          //pull all games to remove player
          Game.find({}, (err, games) => {
            if(err){
              console.log("error on Game.find in deletePlayer", err);
            } else {
              games.forEach(function(game){
                let index = 0;
                while(index < game.player_status.length){
                  //that's a mouthful.  test the player id at the index of the game's player_status array
                  if(game.player_status[index].player._id == req.params.id){
                    console.log("player found in game:", game.time,game.club);
                    break;
                  } else {
                    index++;
                  }
                } //end while
                console.log("splicing player_status");
                let removed_player = game.player_status.splice(index,1); //remove object at index
                console.log(removed_player[0]);
                game.markModified("player_status");
                game.save();
                index = 0; //reset index for next game
              }) //end _games.forEach
            }
          });
        }
      });
    }

  }