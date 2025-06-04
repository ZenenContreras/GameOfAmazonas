/**
 * Custom Hook para el Jugador IA
 * Maneja la lógica de integración entre la IA y la interfaz de usuario
 */

import { useState, useCallback, useRef } from 'react';
import { getBestMove, AI_CONFIG } from '../utils/aiPlayer.js';

export const useAIPlayer = () => {
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiDifficulty, setAIDifficulty] = useState(3);
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const aiTimeoutRef = useRef(null);

  /**
   * Ejecuta el movimiento de la IA de forma asíncrona
   */
  const executeAIMove = useCallback(async (board, onMoveComplete) => {
    if (!isAIEnabled) return;

    setIsAIThinking(true);

    // Añadir un pequeño delay para mostrar que la IA está "pensando"
    const thinkingDelay = Math.random() * 1000 + 500; // 0.5-1.5 segundos

    aiTimeoutRef.current = setTimeout(async () => {
      try {
        // Ejecutar el cálculo en un Web Worker simulado con setTimeout
        const aiMove = await new Promise((resolve) => {
          setTimeout(() => {
            const move = getBestMove(board, aiDifficulty);
            resolve(move);
          }, 0);
        });

        if (aiMove && onMoveComplete) {
          onMoveComplete(aiMove);
        }
      } catch (error) {
        console.error('Error en el movimiento de la IA:', error);
      } finally {
        setIsAIThinking(false);
      }
    }, thinkingDelay);
  }, [isAIEnabled, aiDifficulty]);

  /**
   * Cancela el movimiento de la IA en progreso
   */
  const cancelAIMove = useCallback(() => {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
      aiTimeoutRef.current = null;
      setIsAIThinking(false);
    }
  }, []);

  /**
   * Verifica si es el turno de la IA
   */
  const isAITurn = useCallback((currentPlayer) => {
    return isAIEnabled && currentPlayer === AI_CONFIG.PLAYER_AI;
  }, [isAIEnabled]);

  /**
   * Obtiene el nombre del nivel de dificultad
   */
  const getDifficultyName = useCallback((level) => {
    const names = {
      1: 'Muy Fácil',
      2: 'Fácil',
      3: 'Normal',
      4: 'Difícil',
      5: 'Experto'
    };
    return names[level] || 'Normal';
  }, []);

  return {
    isAIThinking,
    aiDifficulty,
    isAIEnabled,
    setAIDifficulty,
    setIsAIEnabled,
    executeAIMove,
    cancelAIMove,
    isAITurn,
    getDifficultyName
  };
};
