import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Game from "./pages/Game";
import SocketContext from "./context/Socket.context";
import WaitingPage from "./pages/WaitingPage";
import UserContext from "./context/User.context";

function App() {
  return (
    <UserContext>
      <SocketContext>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/play/:color" element={<Game />} />
          <Route path="/wait" element={<WaitingPage />} />
        </Routes>
      </SocketContext>
    </UserContext>
  )
}

export default App
