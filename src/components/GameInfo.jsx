import React from 'react';
import PropTypes from 'prop-types';
import { Timer } from './Timer';
import { Crown, RotateCcw, Clock } from 'lucide-react';

export const GameInfo = ({
  currentPlayer,
  moveHistory,
  gameOver,
  onRestart,
  timeLeft,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6 text-white">
        <div className="text-2xl font-bold text-center">
          {gameOver ? (
            <div className="text-red-300 flex items-center justify-center gap-2">
              <Crown className="w-6 h-6" />
              ¡Jugador {3 - currentPlayer} Gana!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Crown className={`w-6 h-6 ${currentPlayer === 1 ? 'text-gray-900' : 'text-white'}`} />
              Turno del Jugador {currentPlayer}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-amber-50 rounded-lg p-4 flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-amber-800" />
          <Timer timeLeft={timeLeft} />
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-amber-900 flex items-center gap-2">
            Historial de Movimientos
          </h3>
          <div className="h-64 overflow-y-auto bg-amber-50 rounded-lg p-4">
            {moveHistory.map((move, index) => (
              <div key={index} className="text-sm mb-2 p-2 bg-white rounded shadow">
                <span className="font-semibold text-amber-800">
                  {index + 1}. Jugador {move.player}
                </span>
                <div className="text-gray-600 ml-4">
                  Movimiento: [{move.from[0]},{move.from[1]}] → [{move.to[0]},{move.to[1]}]
                  <br />
                  Flecha: [{move.arrow[0]},{move.arrow[1]}]
                </div>
              </div>
            ))}
          </div>
        </div>

        {gameOver && (
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-3 px-4 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <RotateCcw className="w-5 h-5" />
            Jugar de Nuevo
          </button>
        )}
      </div>
    </div>
  );
};

GameInfo.propTypes = {
  currentPlayer: PropTypes.number.isRequired,
  moveHistory: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.number.isRequired,
      from: PropTypes.arrayOf(PropTypes.number).isRequired,
      to: PropTypes.arrayOf(PropTypes.number).isRequired,
      arrow: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  gameOver: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};