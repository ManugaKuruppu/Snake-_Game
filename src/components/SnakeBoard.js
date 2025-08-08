import React from "react";

const SnakeBoard = ({ BOARD_SIZE, snake, food, obstacles }) => (
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
);

export default SnakeBoard;
