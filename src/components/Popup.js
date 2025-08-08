import React from "react";

const Popup = ({ gameOver, level, handleRetry, handleNextLevel }) => (
  <div className="popup">
    <div>
      <h2>{gameOver ? "Game Over!" : `Level ${level} Complete!`}</h2>
      <button onClick={gameOver ? handleRetry : handleNextLevel}>
        {gameOver ? "Retry" : "Next Level"}
      </button>
    </div>
  </div>
);

export default Popup;
