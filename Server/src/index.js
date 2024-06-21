const express = require('express')
const app = express();
const server = require('http').createServer(app)
const WebSocket = require('ws');
const GameMannager = require('./GameMannager');

console.log('starting');
const wss = new WebSocket.Server({ server:server });

console.log('game');
const game = new GameMannager();

console.log('l4c');
wss.on('connection', user => {
  console.log('connecting');
  game.addUser(user);

  user.on('disconnect', () => game.remUser(user));
});

app.get("/", (req, res) => {
  res.send('Hello, world!');
});

const port = 3000;
console.log('listening');
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));