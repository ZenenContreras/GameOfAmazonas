/**
 * Jugador Sintético para el Juego de las Amazonas
 * Implementa el algoritmo Minimax con poda Alfa-Beta
 * 
 * @author AI Assistant
 * @version 1.0
 */

import { getValidMoves, hasValidMoves } from './gameLogic.js';

/**
 * Configuración del jugador IA
 */
export const AI_CONFIG = {
  MAX_DEPTH: 4,        // Profundidad máxima de búsqueda
  PLAYER_AI: 2,        // IA juega como jugador 2 (blancas)
  PLAYER_HUMAN: 1,     // Humano juega como jugador 1 (negras)
  INFINITY: 999999,    // Valor infinito para minimax
  TIME_LIMIT: 5000     // Límite de tiempo en ms para el movimiento
};

/**
 * Función de evaluación heurística del tablero
 * Evalúa la posición desde la perspectiva de la IA
 * 
 * @param {Array<Array<number>>} board - Estado del tablero
 * @param {number} aiPlayer - Número del jugador IA
 * @param {number} humanPlayer - Número del jugador humano
 * @returns {number} Puntuación de la posición
 */
export const evaluateBoard = (board, aiPlayer = AI_CONFIG.PLAYER_AI, humanPlayer = AI_CONFIG.PLAYER_HUMAN) => {
  // Verificar condiciones de victoria/derrota
  const aiCanMove = hasValidMoves(board, aiPlayer);
  const humanCanMove = hasValidMoves(board, humanPlayer);
  
  if (!aiCanMove && !humanCanMove) return 0; // Empate
  if (!aiCanMove) return -AI_CONFIG.INFINITY; // IA pierde
  if (!humanCanMove) return AI_CONFIG.INFINITY; // IA gana
  
  let score = 0;
  
  // Movilidad: contar movimientos disponibles
  const aiMobility = getTotalMobility(board, aiPlayer);
  const humanMobility = getTotalMobility(board, humanPlayer);
  score += (aiMobility - humanMobility) * 10;
  
  // Control territorial: evaluar el área controlada
  const aiTerritory = evaluateTerritory(board, aiPlayer);
  const humanTerritory = evaluateTerritory(board, humanPlayer);
  score += (aiTerritory - humanTerritory) * 5;
  
  // Conectividad: evaluar si las piezas están conectadas
  const aiConnectivity = evaluateConnectivity(board, aiPlayer);
  const humanConnectivity = evaluateConnectivity(board, humanPlayer);
  score += (aiConnectivity - humanConnectivity) * 3;
  
  // Centralización: evaluar la posición de las piezas
  const aiCentralization = evaluateCentralization(board, aiPlayer);
  const humanCentralization = evaluateCentralization(board, humanPlayer);
  score += (aiCentralization - humanCentralization) * 2;
  
  return score;
};

/**
 * Calcula la movilidad total de un jugador
 */
const getTotalMobility = (board, player) => {
  let totalMoves = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player) {
        totalMoves += getValidMoves(board, i, j).length;
      }
    }
  }
  return totalMoves;
};

/**
 * Evalúa el territorio controlado usando flood fill
 */
const evaluateTerritory = (board, player) => {
  const visited = Array(10).fill(0).map(() => Array(10).fill(false));
  let territory = 0;
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player && !visited[i][j]) {
        territory += floodFill(board, visited, i, j, player);
      }
    }
  }
  
  return territory;
};

/**
 * Flood fill para calcular territorio accesible
 */
const floodFill = (board, visited, row, col, player) => {
  if (row < 0 || row >= 10 || col < 0 || col >= 10 || visited[row][col]) {
    return 0;
  }
  
  if (board[row][col] !== 0 && board[row][col] !== player) {
    return 0; // Bloqueado por oponente o flecha
  }
  
  visited[row][col] = true;
  let area = 1;
  
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dx, dy] of directions) {
    area += floodFill(board, visited, row + dx, col + dy, player);
  }
  
  return area;
};

/**
 * Evalúa la conectividad entre las piezas del jugador
 */
const evaluateConnectivity = (board, player) => {
  const pieces = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player) {
        pieces.push([i, j]);
      }
    }
  }
  
  let connectivity = 0;
  for (let i = 0; i < pieces.length; i++) {
    for (let j = i + 1; j < pieces.length; j++) {
      const distance = Math.abs(pieces[i][0] - pieces[j][0]) + Math.abs(pieces[i][1] - pieces[j][1]);
      connectivity += Math.max(0, 20 - distance); // Bonus por proximidad
    }
  }
  
  return connectivity;
};

/**
 * Evalúa qué tan centralizadas están las piezas
 */
const evaluateCentralization = (board, player) => {
  let centralization = 0;
  const center = 4.5; // Centro del tablero 10x10
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player) {
        const distanceFromCenter = Math.abs(i - center) + Math.abs(j - center);
        centralization += Math.max(0, 10 - distanceFromCenter);
      }
    }
  }
  
  return centralization;
};

/**
 * Genera todos los movimientos posibles para un jugador
 */
export const generateAllMoves = (board, player) => {
  const moves = [];
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] === player) {
        const validMoves = getValidMoves(board, i, j);
        
        for (const [destRow, destCol] of validMoves) {
          // Crear tablero temporal con la pieza movida
          const tempBoard = board.map(row => [...row]);
          tempBoard[i][j] = 0;
          tempBoard[destRow][destCol] = player;
          
          // Generar todas las posiciones posibles para la flecha
          const arrowMoves = getValidMoves(tempBoard, destRow, destCol);
          
          for (const [arrowRow, arrowCol] of arrowMoves) {
            moves.push({
              from: [i, j],
              to: [destRow, destCol],
              arrow: [arrowRow, arrowCol]
            });
          }
        }
      }
    }
  }
  
  return moves;
};

/**
 * Aplica un movimiento al tablero
 */
export const applyMove = (board, move) => {
  const newBoard = board.map(row => [...row]);
  const { from, to, arrow } = move;
  
  // Mover pieza
  const player = newBoard[from[0]][from[1]];
  newBoard[from[0]][from[1]] = 0;
  newBoard[to[0]][to[1]] = player;
  
  // Disparar flecha
  newBoard[arrow[0]][arrow[1]] = 3;
  
  return newBoard;
};

/**
 * Algoritmo Minimax con poda Alfa-Beta
 * 
 * @param {Array<Array<number>>} board - Estado actual del tablero
 * @param {number} depth - Profundidad de búsqueda restante
 * @param {boolean} isMaximizing - Si es turno del jugador maximizador (IA)
 * @param {number} alpha - Valor alfa para poda
 * @param {number} beta - Valor beta para poda
 * @param {number} startTime - Tiempo de inicio para control de tiempo
 * @returns {Object} {score, move} - Mejor puntuación y movimiento
 */
export const minimax = (
  board, 
  depth, 
  isMaximizing, 
  alpha = -AI_CONFIG.INFINITY, 
  beta = AI_CONFIG.INFINITY,
  startTime = Date.now()
) => {
  // Control de tiempo
  if (Date.now() - startTime > AI_CONFIG.TIME_LIMIT) {
    return { score: evaluateBoard(board), move: null };
  }
  
  // Caso base: profundidad 0 o juego terminado
  if (depth === 0 || 
      !hasValidMoves(board, AI_CONFIG.PLAYER_AI) || 
      !hasValidMoves(board, AI_CONFIG.PLAYER_HUMAN)) {
    return { score: evaluateBoard(board), move: null };
  }
  
  const currentPlayer = isMaximizing ? AI_CONFIG.PLAYER_AI : AI_CONFIG.PLAYER_HUMAN;
  const moves = generateAllMoves(board, currentPlayer);
  
  // Ordenar movimientos por evaluación heurística para mejor poda
  moves.sort((a, b) => {
    const boardA = applyMove(board, a);
    const boardB = applyMove(board, b);
    const scoreA = evaluateBoard(boardA);
    const scoreB = evaluateBoard(boardB);
    return isMaximizing ? scoreB - scoreA : scoreA - scoreB;
  });
  
  let bestMove = null;
  
  if (isMaximizing) {
    let maxScore = -AI_CONFIG.INFINITY;
    
    for (const move of moves) {
      const newBoard = applyMove(board, move);
      const result = minimax(newBoard, depth - 1, false, alpha, beta, startTime);
      
      if (result.score > maxScore) {
        maxScore = result.score;
        bestMove = move;
      }
      
      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) break; // Poda alfa-beta
    }
    
    return { score: maxScore, move: bestMove };
  } else {
    let minScore = AI_CONFIG.INFINITY;
    
    for (const move of moves) {
      const newBoard = applyMove(board, move);
      const result = minimax(newBoard, depth - 1, true, alpha, beta, startTime);
      
      if (result.score < minScore) {
        minScore = result.score;
        bestMove = move;
      }
      
      beta = Math.min(beta, result.score);
      if (beta <= alpha) break; // Poda alfa-beta
    }
    
    return { score: minScore, move: bestMove };
  }
};

/**
 * Función principal para obtener el mejor movimiento de la IA
 * 
 * @param {Array<Array<number>>} board - Estado actual del tablero
 * @param {number} difficulty - Nivel de dificultad (1-5)
 * @returns {Object} Mejor movimiento {from, to, arrow}
 */
export const getBestMove = (board, difficulty = 3) => {
  const startTime = Date.now();
  
  // Ajustar profundidad según dificultad
  const depth = Math.min(difficulty + 1, AI_CONFIG.MAX_DEPTH);
  
  console.log(`🤖 IA calculando movimiento (dificultad: ${difficulty}, profundidad: ${depth})...`);
  
  const result = minimax(board, depth, true, -AI_CONFIG.INFINITY, AI_CONFIG.INFINITY, startTime);
  
  const elapsed = Date.now() - startTime;
  console.log(`⚡ Movimiento calculado en ${elapsed}ms, puntuación: ${result.score}`);
  
  if (!result.move) {
    // Fallback: elegir movimiento aleatorio si no se encuentra ninguno
    const moves = generateAllMoves(board, AI_CONFIG.PLAYER_AI);
    if (moves.length > 0) {
      return moves[Math.floor(Math.random() * moves.length)];
    }
  }
  
  return result.move;
};

/**
 * Función de utilidad para debugger
 */
export const debugBoard = (board) => {
  console.log('Estado del tablero:');
  for (let i = 0; i < 10; i++) {
    console.log(board[i].join(' '));
  }
  console.log(`Evaluación: ${evaluateBoard(board)}`);
  console.log(`Movilidad IA: ${getTotalMobility(board, AI_CONFIG.PLAYER_AI)}`);
  console.log(`Movilidad Humano: ${getTotalMobility(board, AI_CONFIG.PLAYER_HUMAN)}`);
};
