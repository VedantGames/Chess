const { WebSocketServer } = require('ws');
const { Chess } = require('chess.js');
const GameMannager = require('./GameMannager');

const wss = new WebSocketServer({ port: 8080 });

const game = new GameMannager();

wss.on('connection', user => {
  game.addUser(user);

  user.on('disconnect', () => game.remUser(user));
});