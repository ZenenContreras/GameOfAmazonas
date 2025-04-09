import React from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';

export const Board = ({
  board,
  selectedPiece,
  validMoves,
  onSquareClick,
}) => {
  const isValidMove = (row, col) => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  const isSelected = (row, col) => {
    return selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Column labels */}
      <div className="flex justify-center mb-2">
        {[...Array(10)].map((_, i) => (
          <div key={`col-${i}`} className="w-12 text-center font-semibold text-amber-800">
            {i}
          </div>
        ))}
      </div>
      
      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col justify-around mr-2">
          {[...Array(10)].map((_, i) => (
            <div key={`row-${i}`} className="h-12 flex items-center font-semibold text-amber-800">
              {i}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="grid grid-cols-10 gap-1 bg-gradient-to-br from-amber-700 to-amber-900 p-3 rounded-xl shadow-2xl">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                isSelected={isSelected(rowIndex, colIndex)}
                isValidMove={isValidMove(rowIndex, colIndex)}
                isDark={(rowIndex + colIndex) % 2 === 1}
                onClick={() => onSquareClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  selectedPiece: PropTypes.arrayOf(PropTypes.number),
  validMoves: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onSquareClick: PropTypes.func.isRequired,
};