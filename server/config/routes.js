const players = require('./../controllers/players');
const games = require('./../controllers/games');
const path = require('path');

module.exports = (app) => {
  //player routes
  app.get('/roster', players.getAllPlayers),

  app.get('/roster/:id', players.getPlayer),

  app.post('/roster', players.addPlayer),

  app.put('/roster/:id', players.updatePlayer),

  app.delete('/roster/:id', players.deletePlayer),
  
  //game routes
  app.get('/game', games.getAllGames),

  app.get('/game/:id', games.getGame), //app got game.  I'll see myself out.

  app.post('/game', games.addGame),

  app.delete('/game/:id', games.deleteGame),

  app.all('*', (req, res, next) => {
    console.log("Hit the .all method on server!");
    res.sendFile(path.resolve(__dirname, './../../project/dist/project/index.html'));
  });
}