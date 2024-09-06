import React, { useState, useEffect } from "react";
import "./App.css";

const BOARD_SIZE = 20; // 20x20 grid size

const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200); // Initial speed

  // Handle Snake Movement and User Input
  useEffect(() => {
    if (gameOver) return;

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
  }, [snake, direction, gameOver, speed]);

  // Check if the snake touches itself
  const checkCollision = (head) => {
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
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

    // Check if snake hits the border
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || checkCollision(head)) {
      setGameOver(true);
      return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition()); // Generate new food position
      setSpeed((prevSpeed) => Math.max(50, prevSpeed - 10)); // Increase speed
    } else {
      newSnake.pop(); // Remove the tail
    }

    newSnake.unshift(head); // Add the new head
    setSnake(newSnake);
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <h2>Game Over! Press Refresh to Play Again.</h2>
      ) : (
        <div>
          <h2>Snake Game</h2>
          <div className="board">
            {[...Array(BOARD_SIZE)].map((_, row) =>
              [...Array(BOARD_SIZE)].map((_, col) => {
                const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
                const isFood = food.x === col && food.y === row;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`cell ${isSnake ? "snake" : isFood ? "food" : ""}`}
                  />
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
