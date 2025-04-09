import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { createInitialBoard, getValidMoves, hasValidMoves } from './utils/gameLogic';

const GamePhase = {
  SELECT_PIECE: 'SELECT_PIECE',
  SELECT_DESTINATION: 'SELECT_DESTINATION',
  SHOOT_ARROW: 'SHOOT_ARROW'
};

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [gamePhase, setGamePhase] = useState(GamePhase.SELECT_PIECE);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [lastMove, setLastMove] = useState(null);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver, timeLeft]);

  const handleSquareClick = (row, col) => {
    if (gameOver) return;

    if (gamePhase === GamePhase.SELECT_PIECE) {
      if (board[row][col] === currentPlayer) {
        setSelectedPiece([row, col]);
        setValidMoves(getValidMoves(board, row, col));
        setGamePhase(GamePhase.SELECT_DESTINATION);
      }
    } else if (gamePhase === GamePhase.SELECT_DESTINATION) {
      if (selectedPiece && validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = [...board.map(row => [...row])];
        newBoard[selectedPiece[0]][selectedPiece[1]] = 0;
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        setLastMove({ from: selectedPiece, to: [row, col] });
        setValidMoves(getValidMoves(newBoard, row, col));
        setGamePhase(GamePhase.SHOOT_ARROW);
      } else if (board[row][col] === currentPlayer) {
        setSelectedPiece([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      }
    } else if (gamePhase === GamePhase.SHOOT_ARROW) {
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = [...board.map(row => [...row])];
        newBoard[row][col] = 3; // Arrow
        setBoard(newBoard);
        
        if (lastMove) {
          setMoveHistory([
            ...moveHistory,
            {
              player: currentPlayer,
              from: lastMove.from,
              to: lastMove.to,
              arrow: [row, col],
            },
          ]);
        }

        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        if (!hasValidMoves(newBoard, nextPlayer)) {
          setGameOver(true);
        } else {
          setCurrentPlayer(nextPlayer);
          setGamePhase(GamePhase.SELECT_PIECE);
          setSelectedPiece(null);
          setValidMoves([]);
          setLastMove(null);
        }
      }
    }
  };

  const handleRestart = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer(1);
    setSelectedPiece(null);
    setValidMoves([]);
    setGamePhase(GamePhase.SELECT_PIECE);
    setMoveHistory([]);
    setGameOver(false);
    setTimeLeft(300);
    setLastMove(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
      <div className="max-w-7xl w-full p-8">
        <h1 className="text-5xl font-bold text-center mb-12 text-amber-900">
          Juego de las Amazonas
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-center">
            <Board
              board={board}
              selectedPiece={selectedPiece}
              validMoves={validMoves}
              onSquareClick={handleSquareClick}
            />
          </div>
          <div>
            <GameInfo
              currentPlayer={currentPlayer}
              moveHistory={moveHistory}
              gameOver={gameOver}
              onRestart={handleRestart}
              timeLeft={timeLeft}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;