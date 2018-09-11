const players = require('./../controllers/players');
const games = require('./../controllers/games');
const path = require('path');

module.exports = (app) => {

  app.all('*', function(req,res,next){
    console.log("Incoming request information:");
    console.log("req.method: ",req.method);
    console.log("req.originalUrl: ",req.originalUrl);
    console.log("req.params: ",req.params);
    console.log("req.body: ",req.body);
    console.log("req.rawHeaders: ",req.rawHeaders);
    console.log("*******endlog*********");
    next();
  });

  //player routes
  app.get('/roster', players.getAllPlayers),

  app.get('/roster/:id', players.getPlayer),

  app.post('/roster', players.addPlayer),

  app.put('/roster/:id', players.updatePlayer),

  app.delete('/roster/:id', players.deletePlayer),
  
  //game routes
  app.get('/game', games.getAllGames),

  app.get('/game/:id', games.getGame),

  app.post('/game', games.addGame),

  app.put('/game/:id', games.editGame),

  app.delete('/game/:id', games.deleteGame),

  app.all('*', (req, res, next) => {
    console.log("Hit the .all method on server!");
    res.sendFile(path.resolve(__dirname, './../../project/dist/project/index.html'));
  });
}