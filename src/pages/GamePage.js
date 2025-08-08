import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SnakeBoard from "../components/SnakeBoard";
import ScoreBoard from "../components/ScoreBoard";
import Popup from "../components/Popup";
import "../styles/App.css";

const BOARD_SIZE = 20;
const levelObstacles = [
  [],
  [{ x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }],
  [{ x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }],
  [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 15, y: 15 }, { x: 15, y: 16 }, { x: 15, y: 17 }],
  [{ x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 }],
  [{ x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 16, y: 16 }, { x: 16, y: 17 }, { x: 16, y: 18 }],
  [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 }, { x: 14, y: 14 }, { x: 14, y: 15 }, { x: 14, y: 16 }, { x: 14, y: 17 }],
  [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 17, y: 17 }, { x: 17, y: 18 }, { x: 18, y: 17 }, { x: 18, y: 18 }, { x: 19, y: 19 }],
  [{ x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 13, y: 13 }, { x: 13, y: 14 }, { x: 13, y: 15 }, { x: 13, y: 16 }, { x: 13, y: 17 }, { x: 13, y: 18 }],
  [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 18, y: 18 }, { x: 18, y: 17 }, { x: 18, y: 16 }, { x: 17, y: 18 }, { x: 17, y: 17 }, { x: 16, y: 18 }, { x: 16, y: 17 }]
];

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});


const GamePage = ({ playerName, level, setLevel, resetPlayer }) => {
  const navigate = useNavigate();
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const obstacles = levelObstacles[level - 1] || [];
  const boardRef = useRef(null);
  // Ensure board is visible on game start/level change
  // Move moveSnake above useEffect to avoid ReferenceError

  // Scroll board into view on mount, level change, or player change
  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [level, playerName]);

  // Scroll board into view after retry
  useEffect(() => {
    if (!showPopup && !gameOver && boardRef.current) {
      setTimeout(() => {
        boardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }
  }, [showPopup, gameOver]);

  useEffect(() => {
    if (gameOver || !playerName) return;
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "p" || e.key === "P") {
        setIsPaused((prev) => !prev);
        return;
      }
      if (isPaused) return;
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    let gameInterval = null;
    if (!isPaused) {
      gameInterval = setInterval(moveSnake, speed);
    }
    return () => {
      if (gameInterval) clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, direction, gameOver, speed, playerName, isPaused]);
  // Add handleNextLevel for Popup
  const handleNextLevel = () => {
    setLevel(level + 1);
    resetGame();
    setTimeout(() => {
      if (boardRef.current) {
        boardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const checkCollision = (head) => {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    for (let obstacle of obstacles) {
      if (head.x === obstacle.x && head.y === obstacle.y) return true;
    }
    return false;
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || checkCollision(head)) {
      setGameOver(true);
      setShowPopup(true);
      setIsPaused(true);
      return;
    }
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition());
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10));
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        if (newScore >= level * 50) {
          setShowPopup(true);
          setIsPaused(true);
        }
        return newScore;
      });
    } else {
      newSnake.pop();
    }
    newSnake.unshift(head);
    setSnake(newSnake);
  };
  const handleRetry = () => resetGame();
  const resetGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setFood(getRandomPosition());
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setShowPopup(false);
    setScore(0);
    setSpeed(200);
    setIsPaused(false);
  };

  return (
    <div className="game-container game-glass-bg">
      <h1 className="game-title">🐍 Snake Game</h1>
      {isPaused && !showPopup && (
        <div className="pause-overlay">
          <div className="pause-content">
            Game Paused<br /><span className="pause-resume-hint">Press P to resume</span>
          </div>
        </div>
      )}
      {showPopup ? (
        <Popup gameOver={gameOver} level={level} handleRetry={handleRetry} handleNextLevel={handleNextLevel} />
      ) : (
        <div className="game-flex-row">
          <div className="player-info-glass">
            <div className="player-info-lines">
              <div className="player-info-label">Player:</div>
              <div className="player-name" style={{fontSize: '1.18rem', fontWeight: 700, marginBottom: 8}}>{playerName}</div>
              <div className="player-info-label">Level:</div>
              <div className="level-badge" style={{display: 'inline-block', marginBottom: 8}}>Level {level}</div>
              <div className="player-info-label">Score:</div>
              <div style={{fontSize: '1.18rem', fontWeight: 700, color: '#334155', marginBottom: 8}}>{score}</div>
            </div>
            <button
              onClick={() => {
                resetPlayer();
                navigate("/");
              }}
              className="change-player-btn"
            >
              Change Player
            </button>
          </div>
          <div className="board-glass" ref={boardRef}>
            <SnakeBoard BOARD_SIZE={BOARD_SIZE} snake={snake} food={food} obstacles={obstacles} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
