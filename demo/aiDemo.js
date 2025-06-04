/**
 * Demostración del Jugador Sintético
 * Script para mostrar las capacidades de la IA
 */

import { 
  evaluateBoard, 
  generateAllMoves, 
  getBestMove,
  debugBoard,
  AI_CONFIG 
} from '../src/utils/aiPlayer.js';
import { createInitialBoard, hasValidMoves } from '../src/utils/gameLogic.js';

/**
 * Simula una partida completa entre dos IAs
 */
function simulateAIvsAIGame() {
  console.log('🎮 Simulando partida IA vs IA\n');
  
  let board = createInitialBoard();
  let currentPlayer = 1;
  let moveCount = 0;
  const maxMoves = 50; // Límite para evitar partidas infinitas
  
  while (moveCount < maxMoves) {
    console.log(`\n--- Movimiento ${moveCount + 1} - Jugador ${currentPlayer} ---`);
    
    // Verificar si el jugador actual puede moverse
    if (!hasValidMoves(board, currentPlayer)) {
      console.log(`🏆 ¡Jugador ${currentPlayer === 1 ? 2 : 1} gana! Jugador ${currentPlayer} no puede moverse.`);
      break;
    }
    
    // Obtener el mejor movimiento (usando la IA para ambos jugadores)
    const aiMove = getBestMove(board, 2); // Dificultad normal
    
    if (!aiMove) {
      console.log(`❌ Error: No se pudo encontrar un movimiento válido para el jugador ${currentPlayer}`);
      break;
    }
    
    console.log(`Movimiento: ${JSON.stringify(aiMove)}`);
    
    // Aplicar el movimiento
    const newBoard = board.map(row => [...row]);
    newBoard[aiMove.from[0]][aiMove.from[1]] = 0;
    newBoard[aiMove.to[0]][aiMove.to[1]] = currentPlayer;
    newBoard[aiMove.arrow[0]][aiMove.arrow[1]] = 3;
    
    board = newBoard;
    
    // Mostrar evaluación del tablero
    const evaluation = evaluateBoard(board);
    console.log(`Evaluación del tablero: ${evaluation}`);
    
    // Cambiar jugador
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    moveCount++;
  }
  
  if (moveCount >= maxMoves) {
    console.log('🔄 Partida terminada por límite de movimientos');
  }
  
  console.log('\n📊 Estado final del tablero:');
  debugBoard(board);
}

/**
 * Analiza una posición específica
 */
function analyzePosition() {
  console.log('\n🔍 Análisis de posición inicial\n');
  
  const board = createInitialBoard();
  
  console.log('Tablero inicial:');
  debugBoard(board);
  
  console.log('\nAnálisis para cada jugador:');
  
  // Análisis para jugador 1 (humano)
  const movesP1 = generateAllMoves(board, 1);
  console.log(`Jugador 1: ${movesP1.length} movimientos posibles`);
  
  // Análisis para jugador 2 (IA)
  const movesP2 = generateAllMoves(board, 2);
  console.log(`Jugador 2: ${movesP2.length} movimientos posibles`);
  
  // Mejores movimientos para cada jugador
  console.log('\nMejores movimientos:');
  const bestMoveP1 = getBestMove(board, 3);
  const bestMoveP2 = getBestMove(board, 3);
  
  console.log(`Mejor movimiento P1: ${JSON.stringify(bestMoveP1)}`);
  console.log(`Mejor movimiento P2: ${JSON.stringify(bestMoveP2)}`);
}

/**
 * Demuestra la escalabilidad de dificultad
 */
function demonstrateDifficultyScaling() {
  console.log('\n📈 Demostración de escalabilidad de dificultad\n');
  
  const board = createInitialBoard();
  
  for (let difficulty = 1; difficulty <= 5; difficulty++) {
    console.log(`\n--- Dificultad ${difficulty} ---`);
    
    const startTime = Date.now();
    const bestMove = getBestMove(board, difficulty);
    const elapsed = Date.now() - startTime;
    
    console.log(`Tiempo: ${elapsed}ms`);
    console.log(`Movimiento: ${JSON.stringify(bestMove)}`);
    
    if (elapsed > 10000) {
      console.log('⚠️ Tiempo excesivo, deteniendo escalabilidad');
      break;
    }
  }
}

/**
 * Función principal de demostración
 */
function runDemo() {
  console.log('🚀 Demostración del Jugador Sintético del Juego de las Amazonas\n');
  console.log('================================================\n');
  
  try {
    // Análisis de posición
    analyzePosition();
    
    // Escalabilidad de dificultad
    demonstrateDifficultyScaling();
    
    // Simulación de partida (comentado para evitar tiempo excesivo)
    // simulateAIvsAIGame();
    
    console.log('\n✨ Demostración completada exitosamente');
    
  } catch (error) {
    console.error('❌ Error durante la demostración:', error);
  }
}

// Ejecutar demostración si se ejecuta directamente
if (typeof window === 'undefined') {
  runDemo();
}

export { runDemo, simulateAIvsAIGame, analyzePosition, demonstrateDifficultyScaling };
