import React, { useState, useEffect } from "react";
import PlayerForm from "./PlayerForm"; // Import the player form component
import "./App.css";

const BOARD_SIZE = 20; // 20x20 grid size

// Define obstacle positions for each level
const levelObstacles = [
  [], // Level 1 has no obstacles
  [{ x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }], // Level 2 obstacles
  [{ x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 }], // Level 3 obstacles
  [{ x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 15, y: 15 }, { x: 15, y: 16 }, { x: 15, y: 17 }], // Level 4
  [{ x: 8, y: 8 }, { x: 8, y: 9 }, { x: 8, y: 10 }, { x: 8, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 }, { x: 12, y: 14 }], // Level 5
  [{ x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, { x: 16, y: 16 }, { x: 16, y: 17 }, { x: 16, y: 18 }], // Level 6
  [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }, { x: 7, y: 10 }, { x: 14, y: 14 }, { x: 14, y: 15 }, { x: 14, y: 16 }, { x: 14, y: 17 }], // Level 7
  [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 17, y: 17 }, { x: 17, y: 18 }, { x: 18, y: 17 }, { x: 18, y: 18 }, { x: 19, y: 19 }], // Level 8
  [{ x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 13, y: 13 }, { x: 13, y: 14 }, { x: 13, y: 15 }, { x: 13, y: 16 }, { x: 13, y: 17 }, { x: 13, y: 18 }], // Level 9
  [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 18, y: 18 }, { x: 18, y: 17 }, { x: 18, y: 16 }, { x: 17, y: 18 }, { x: 17, y: 17 }, { x: 16, y: 18 }, { x: 16, y: 17 }] // Level 10
];


const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
};

const SnakeGame = () => {
  const [playerName, setPlayerName] = useState(""); // Store player name
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200); // Adjusted initial speed
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1); // Track current level
  const [showPopup, setShowPopup] = useState(false); // Show level completion popup
  const [isPaused, setIsPaused] = useState(false); // Track if the game is paused

  const obstacles = levelObstacles[level - 1] || [];

  // Handle Snake Movement and User Input
  useEffect(() => {
    if (gameOver || !playerName || isPaused) return;

    const handleKeyDown = (e) => {
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

    const gameInterval = setInterval(() => {
      moveSnake();
    }, speed);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, direction, gameOver, speed, playerName, isPaused]);

  // Check if the snake touches itself or obstacles
  const checkCollision = (head) => {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    // Check if the snake collides with an obstacle
    for (let obstacle of obstacles) {
      if (head.x === obstacle.x && head.y === obstacle.y) {
        return true;
      }
    }
    return false;
  };

  // Move Snake Logic
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    // Check if snake hits the border, itself, or an obstacle
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || checkCollision(head)) {
      setGameOver(true);
      setShowPopup(true);
      setIsPaused(true); // Pause the game when the game is over
      return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition()); // Generate new food position
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10)); // Increase speed
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        // Level up when reaching score threshold
        if (newScore >= level * 50) {
          setShowPopup(true);
          setIsPaused(true); // Pause the game when the level is complete
        }
        return newScore;
      });
    } else {
      newSnake.pop(); // Remove the tail
    }

    newSnake.unshift(head); // Add the new head
    setSnake(newSnake);
  };

  // Handle form submission for player name
  const handleNameSubmit = (name) => {
    setPlayerName(name); // Set the player's name
  };

  const handleNextLevel = () => {
    setLevel((prevLevel) => prevLevel + 6); // Move to the next level
    resetGame();
  };

  const handleRetry = () => {
    resetGame();
  };

  const resetGame = () => {
    setSnake([{ x: 2, y: 2 }]);
    setFood(getRandomPosition());
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setShowPopup(false);
    setScore(0);
    setSpeed(200);
    setIsPaused(false); // Resume the game
  };

  return (
    <div className="game-container">
      {!playerName ? (
        <PlayerForm onSubmit={handleNameSubmit} />
      ) : (
        <>
          {showPopup ? (
            <div className="popup">
              <h2>{gameOver ? "Game Over!" : `Level ${level} Complete!`}</h2>
              <button onClick={gameOver ? handleRetry : handleNextLevel}>
                {gameOver ? "Retry" : "Next Level"}
              </button>
            </div>
          ) : (
            <div>
              <h2>Welcome, {playerName}! Snake Game - Level {level}</h2>
              <div className="score-board">
                <h2>Score: {score}</h2>
              </div>
              <div className="board">
                {[...Array(BOARD_SIZE)].map((_, row) =>
                  [...Array(BOARD_SIZE)].map((_, col) => {
                    const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
                    const isFood = food.x === col && food.y === row;
                    const isObstacle = obstacles.some((obstacle) => obstacle.x === col && obstacle.y === row);
                    return (
                      <div
                        key={`${row}-${col}`}
                        className={`cell ${isSnake ? "snake" : isFood ? "food" : isObstacle ? "obstacle" : ""}`}
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SnakeGame;
