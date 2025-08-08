import React, { useState } from "react";



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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: '2.2rem', marginBottom: 6, color: '#6366f1', filter: 'drop-shadow(0 2px 8px #6366f1aa)' }}>👤</span>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.7rem', color: '#3730a3', letterSpacing: '1px' }}>Enter Your Name</h2>
          <div style={{ color: '#64748b', fontSize: '1.01rem', marginTop: 6, marginBottom: 0, fontWeight: 500, letterSpacing: '0.1px' }}>
            This will be displayed on the scoreboard
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            required
            className="input-field"
            maxLength={18}
            autoFocus
            style={{ marginBottom: 18 }}
          />
          <button type="submit" className="submit-btn" style={{ width: '100%' }}>
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
