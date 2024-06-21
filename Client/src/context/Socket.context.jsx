import React, { createContext, useEffect, useState } from 'react'

export const Socket = createContext(null);

const URL = 'ws://chess-vedant-server.vercel.app:8080';

function SocketContext({children}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(URL);
    ws.onopen = () => {
      setSocket(ws);
    }

    ws.onclose = () => {
      setSocket(null);
    }

    return () => {
      ws.close();
    }
  }, []);

  return (
    <Socket.Provider value={{socket}}>
      {children}
    </Socket.Provider>
  )
}

export default SocketContext
