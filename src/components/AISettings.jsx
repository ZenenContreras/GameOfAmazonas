/**
 * Componente de configuración de la IA
 * Permite al usuario configurar el jugador sintético
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Bot, Settings, Zap, Brain, Cpu } from 'lucide-react';

export const AISettings = ({
  isAIEnabled,
  aiDifficulty,
  isAIThinking,
  onToggleAI,
  onDifficultyChange,
  getDifficultyName
}) => {
  const difficultyIcons = {
    1: <Zap className="w-4 h-4" />,
    2: <Settings className="w-4 h-4" />,
    3: <Bot className="w-4 h-4" />,
    4: <Brain className="w-4 h-4" />,
    5: <Cpu className="w-4 h-4" />
  };

  const difficultyColors = {
    1: 'from-green-500 to-green-600',
    2: 'from-blue-500 to-blue-600',
    3: 'from-yellow-500 to-yellow-600',
    4: 'from-orange-500 to-orange-600',
    5: 'from-red-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 p-4 text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <h3 className="text-lg font-bold">Jugador IA</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle IA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Activar IA</span>
          </div>
          <button
            onClick={onToggleAI}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAIEnabled ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAIEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Estado de la IA */}
        {isAIEnabled && (
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isAIThinking ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
              <span className="text-sm font-medium text-purple-800">
                {isAIThinking ? 'IA calculando...' : 'IA lista'}
              </span>
            </div>
            {isAIThinking && (
              <div className="text-xs text-purple-600">
                🧠 Analizando posiciones y calculando el mejor movimiento...
              </div>
            )}
          </div>
        )}

        {/* Selector de dificultad */}
        {isAIEnabled && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Nivel de Dificultad
            </label>
            
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => onDifficultyChange(level)}
                  disabled={isAIThinking}
                  className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                    aiDifficulty === level
                      ? `bg-gradient-to-r ${difficultyColors[level]} text-white border-transparent shadow-lg transform scale-105`
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-md'
                  } ${isAIThinking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {difficultyIcons[level]}
                    <span className="text-xs font-medium">{level}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {getDifficultyName(aiDifficulty)}
              </span>
            </div>
          </div>
        )}

        {/* Información de la IA */}
        {isAIEnabled && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">Características de la IA:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Algoritmo Minimax con poda Alfa-Beta</li>
              <li>• Evaluación heurística avanzada</li>
              <li>• Análisis de movilidad y territorio</li>
              <li>• Estrategia adaptativa por dificultad</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

AISettings.propTypes = {
  isAIEnabled: PropTypes.bool.isRequired,
  aiDifficulty: PropTypes.number.isRequired,
  isAIThinking: PropTypes.bool.isRequired,
  onToggleAI: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  getDifficultyName: PropTypes.func.isRequired,
};
