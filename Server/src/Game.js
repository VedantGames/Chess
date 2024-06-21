const { Chess } = require('chess.js');
const { INIT_GAME } = require('./constants');

module.exports = class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.chance = true; // true == white || false == black

    
    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: "white",
        playerData: this.player2.playerData
      }
    }))
    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: "black",
        playerData: this.player1.playerData
      }
    }))
  }

  move(move) {
    try {
      this.board.move(move);
      this.chance = !this.chance;
    } catch (e) {
      console.log(e);
    }
    this.player1.send(JSON.stringify({
      type: 'board',
      payload: {
        board: this.board.fen(),
        chance: this.chance ? 'white' : 'black'
      }
    }))
    this.player2.send(JSON.stringify({
      type: 'board',
      payload: {
        board: this.board.fen(),
        chance: this.chance ? 'white' : 'black'
      }
    }))

  }
}