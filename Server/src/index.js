const { WebSocketServer } = require('ws');
const { Chess } = require('chess.js');
const GameMannager = require('./GameMannager');

console.log('starting');
const wss = new WebSocketServer({ port: 8080 });

console.log('game');
const game = new GameMannager();

console.log('l4c');
wss.on('connection', user => {
  game.addUser(user);

  user.on('disconnect', () => game.remUser(user));
});