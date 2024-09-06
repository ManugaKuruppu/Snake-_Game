// PlayerForm.js
import React, { useState } from "react";

const PlayerForm = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      onSubmit(playerName);  // Call the onSubmit function passed down from SnakeGame.js
    }
  };

  return (
    <div className="name-form">
      <h2>Enter your name to start the game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default PlayerForm;
