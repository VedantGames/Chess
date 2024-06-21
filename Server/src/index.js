const express = require('express')
const app = express();
const WebSocket = require('ws');
const GameMannager = require('./GameMannager');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1823029",
  key: "1337f87ef60cc1b7b0d9",
  secret: "85c93edb01e145a2d1a9",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

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
