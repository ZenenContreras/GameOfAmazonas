import React from 'react';
import { Square } from './Square';
import { Move } from '../types';

interface BoardProps {
  board: number[][];
  selectedPiece: number[] | null;
  validMoves: number[][];
  onSquareClick: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  selectedPiece,
  validMoves,
  onSquareClick,
}) => {
  const isValidMove = (row: number, col: number) => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  const isSelected = (row: number, col: number) => {
    return selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col;
  };

  return (
    <div className="grid grid-cols-10 gap-1 bg-amber-800 p-2 rounded-lg shadow-xl">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            isSelected={isSelected(rowIndex, colIndex)}
            isValidMove={isValidMove(rowIndex, colIndex)}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};