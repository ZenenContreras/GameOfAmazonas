import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { GameInfo } from './components/GameInfo';
import { AISettings } from './components/AISettings';
import { createInitialBoard, getValidMoves, hasValidMoves } from './utils/gameLogic';
import { useAIPlayer } from './hooks/useAIPlayer';
import { AI_CONFIG } from './utils/aiPlayer';

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

  // Hook para el jugador IA
  const {
    isAIThinking,
    aiDifficulty,
    isAIEnabled,
    setAIDifficulty,
    setIsAIEnabled,
    executeAIMove,
    cancelAIMove,
    isAITurn,
    getDifficultyName
  } = useAIPlayer();

  // Efecto para ejecutar movimiento de IA
  useEffect(() => {
    if (!gameOver && isAITurn(currentPlayer) && gamePhase === GamePhase.SELECT_PIECE) {
      executeAIMove(board, handleAIMove);
    }
  }, [currentPlayer, gamePhase, gameOver, isAITurn, executeAIMove, board]);

  // Cleanup al desmontar componente
  useEffect(() => {
    return () => {
      cancelAIMove();
    };
  }, [cancelAIMove]);

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

  /**
   * Maneja el movimiento completo de la IA
   */
  const handleAIMove = (aiMove) => {
    if (!aiMove || gameOver) return;

    const { from, to, arrow } = aiMove;
    
    // Aplicar movimiento completo de la IA
    const newBoard = [...board.map(row => [...row])];
    newBoard[from[0]][from[1]] = 0; // Quitar pieza de posición original
    newBoard[to[0]][to[1]] = currentPlayer; // Mover pieza a nueva posición
    newBoard[arrow[0]][arrow[1]] = 3; // Disparar flecha
    
    setBoard(newBoard);
    
    // Actualizar historial
    setMoveHistory([
      ...moveHistory,
      {
        player: currentPlayer,
        from: from,
        to: to,
        arrow: arrow,
      },
    ]);

    // Cambiar turno
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
  };

  const handleSquareClick = (row, col) => {
    if (gameOver || isAITurn(currentPlayer) || isAIThinking) return;

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
    cancelAIMove(); // Cancelar cualquier movimiento de IA en progreso
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

  const handleToggleAI = () => {
    if (isAIThinking) {
      cancelAIMove();
    }
    setIsAIEnabled(!isAIEnabled);
    
    // Si se activa la IA y es su turno, ejecutar movimiento
    if (!isAIEnabled && currentPlayer === AI_CONFIG.PLAYER_AI && !gameOver) {
      setTimeout(() => {
        executeAIMove(board, handleAIMove);
      }, 500);
    }
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
          <div className="space-y-6">
            <AISettings
              isAIEnabled={isAIEnabled}
              aiDifficulty={aiDifficulty}
              isAIThinking={isAIThinking}
              onToggleAI={handleToggleAI}
              onDifficultyChange={setAIDifficulty}
              getDifficultyName={getDifficultyName}
            />
            <GameInfo
              currentPlayer={currentPlayer}
              moveHistory={moveHistory}
              gameOver={gameOver}
              onRestart={handleRestart}
              timeLeft={timeLeft}
              isAIEnabled={isAIEnabled}
              isAIThinking={isAIThinking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;