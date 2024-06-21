const express = require('express')
const app = express();
const WebSocket = require('ws');
const GameMannager = require('./GameMannager');

console.log('starting');
app.get("/", (req, res) => {
  res.send('Hello, world!');
});

const port = 3000;
console.log('listening');
const server = app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

const wss = new WebSocket.Server({ server:server });

console.log('game');
const game = new GameMannager();

console.log('l4c');
wss.on('connection', user => {
  console.log('connecting');
  game.addUser(user);

  user.on('disconnect', () => game.remUser(user));
});
