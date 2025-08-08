

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import GamePage from "./pages/GamePage";
import PlayerFormPage from "./pages/PlayerFormPage";

const AppRoutes = ({ playerName, setPlayerName, level, setLevel }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          !playerName ? (
            <PlayerFormPage
              onSubmit={(name) => {
                setPlayerName(name);
                setLevel(1);
              }}
              level={level}
            />
          ) : (
            <Navigate to="/game" replace />
          )
        }
      />
      <Route
        path="/game"
        element={
          playerName ? (
            <GamePage
              playerName={playerName}
              level={level}
              setLevel={setLevel}
              resetPlayer={() => setPlayerName("")}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={playerName ? "/game" : "/"} replace />} />
    </Routes>
  );
};

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [level, setLevel] = useState(1);

  return (
    <Router>
      <AppRoutes
        playerName={playerName}
        setPlayerName={setPlayerName}
        level={level}
        setLevel={setLevel}
      />
    </Router>
  );
};

export default App;
