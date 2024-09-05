import React, { useState, useEffect } from "react";
import "./App.css";

const BOARD_SIZE = 10; // 10x10 grid size

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
  const [inputDirection, setInputDirection] = useState(direction);

  // Handle Snake Movement and User Input
  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setInputDirection({ x: 0, y: -1 }); // Prevents moving backward
          break;
        case "ArrowDown":
          if (direction.y === 0) setInputDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setInputDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setInputDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 300); // Moves the snake every 300ms

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, direction, gameOver]);

  // Move Snake Logic
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + inputDirection.x,
      y: newSnake[0].y + inputDirection.y,
    };

    // Check if snake hits the border
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      setGameOver(true);
      return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition()); // Generate new food position
    } else {
      newSnake.pop(); // Remove the tail
    }

    newSnake.unshift(head); // Add the new head
    setSnake(newSnake);
    setDirection(inputDirection); // Update the current direction to the latest input direction
  };

  return (
    <div className="game-board">
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