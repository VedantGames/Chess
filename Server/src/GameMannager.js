const { INIT_GAME, MOVE } = require("./constants");
const Game = require("./Game");

module.exports = class GameMannager {
  games = [];
  waitingUser;
  users = [];

  constructor() {
    this.games = [];
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  remUser(socket) {

  }

  addHandler(socket) {
    socket.on('message', data => {
      const message = JSON.parse(data.toString());
      
      if (message.type === INIT_GAME) {
        socket.playerData = message.payload;
        if (this.waitingUser) {
          this.games.push(new Game(this.waitingUser, socket));
          this.waitingUser = null;
        } else {
          this.waitingUser = socket;
          socket.send(JSON.stringify({
            type: 'waiting',
          }))
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
        
        game.move(message.move);
      }
    })
  }
}