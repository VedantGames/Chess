import React, { useContext, useEffect, useState } from 'react'
import { Socket } from '../context/Socket.context'
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useParams } from 'react-router-dom';
import { User } from '../context/User.context';

function Game() {
  const { socket } = useContext(Socket);
  const { user } = useContext(User);
  const [board, setBoard] = useState(new Chess());
  const [position, setPosition] = useState(board.fen());
  const { color } = useParams();
  const [chance, setChance] = useState('white');

  useEffect(() => {
    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      
      if (message.type === "board") {
        board.load(message.payload.board);
        setPosition(board.fen())
        setChance(message.payload.chance)
      };
    }
  }, [socket]);

  const move = (from, to) => {
    if (chance === color) {
      try {
        board.move(from+to);
        socket.send(JSON.stringify({
          type: "move",
          move: from+to
        }))
      } catch (error) {
        return false;
      }
  
      return true;
    }
    return false;
  }

  return (
    <div className='px-20 py-10'>
      <div>
        <div className='flex gap-2 mb-3'>
          <h1 className='text-2xl font-bold'>
            {socket.playerData.name}
          </h1>
          <h2 className='text-lg text-[#aaa] mt-1'>
            ({socket.playerData.rating})
          </h2>
        </div>
      </div>
      <div>
        <Chessboard
          id={'board'}
          position={position}
          onPieceDrop={move}
          boardWidth={750}
          customLightSquareStyle={{backgroundColor: "#ebecd0"}}
          customDarkSquareStyle={{backgroundColor: "#739552"}}
        />
      </div>
      <div>
        <div className='flex gap-2 mb-3'>
          <h1 className='text-2xl font-bold'>
            {user.name}
          </h1>
          <h2 className='text-lg text-[#aaa] mt-1'>
            ({user.rating})
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Game
