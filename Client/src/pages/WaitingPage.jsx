import React, { useContext, useEffect } from 'react'
import { Socket } from '../context/Socket.context'
import { useNavigate } from 'react-router-dom';

function WaitingPage() {
  const { socket } = useContext(Socket);
  const navigate = useNavigate();

  useEffect(() => {
    socket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === 'init_game') {
        socket.playerData = message.payload.playerData;
        navigate('/play/' + message.payload.color)
      };
    }
  }, [socket]);
  
  return (
    <div>
      Waiting
    </div>
  )
}

export default WaitingPage
