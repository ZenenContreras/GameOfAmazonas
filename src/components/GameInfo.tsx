import React from 'react';
import { Move } from '../types';
import { Timer } from './Timer';

interface GameInfoProps {
  currentPlayer: number;
  moveHistory: Move[];
  gameOver: boolean;
  onRestart: () => void;
  timeLeft: number;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  moveHistory,
  gameOver,
  onRestart,
  timeLeft,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <div className="text-2xl font-bold text-center mb-4">
        {gameOver ? (
          <div className="text-red-600">
            ¡Juego Terminado! - Ganador: Jugador {3 - currentPlayer}
          </div>
        ) : (
          <div>
            Turno del Jugador {currentPlayer}
            <div className={`w-4 h-4 rounded-full inline-block ml-2 ${
              currentPlayer === 1 ? 'bg-black' : 'bg-white border-2 border-black'
            }`} />
          </div>
        )}
      </div>

      <Timer timeLeft={timeLeft} />

      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">Historial de Movimientos:</h3>
        <div className="h-64 overflow-y-auto">
          {moveHistory.map((move, index) => (
            <div key={index} className="text-sm mb-1">
              {index + 1}. Jugador {move.player}: ({move.from[0]},{move.from[1]}) →
              ({move.to[0]},{move.to[1]}) ↠ ({move.arrow[0]},{move.arrow[1]})
            </div>
          ))}
        </div>
      </div>

      {gameOver && (
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Jugar de Nuevo
        </button>
      )}
    </div>
  );
};