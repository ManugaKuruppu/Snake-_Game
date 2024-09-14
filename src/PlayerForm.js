// PlayerForm.js
import React, { useState } from "react";
import "./PlayerForm.css"; // Assuming you'll create a CSS file for styles

const PlayerForm = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      onSubmit(playerName);
    }
  };

  return (
    <div className="form-container">
      <div className="name-form">
        <h2>Enter your name to start the game</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
