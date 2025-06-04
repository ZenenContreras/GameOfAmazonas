/**
 * Pruebas para el Jugador Sintético del Juego de las Amazonas
 * Verificación de funcionalidad y rendimiento de la IA
 */

import { 
  evaluateBoard, 
  generateAllMoves, 
  applyMove, 
  getBestMove,
  minimax,
  AI_CONFIG 
} from '../src/utils/aiPlayer.js';
import { createInitialBoard } from '../src/utils/gameLogic.js';

// Mock de console.log para las pruebas
console.log = (...args) => console.info(...args);

/**
 * Prueba 1: Verificar que la evaluación del tablero inicial es equilibrada
 */
function testInitialBoardEvaluation() {
  console.log('🧪 Prueba 1: Evaluación del tablero inicial');
  
  const board = createInitialBoard();
  const evaluation = evaluateBoard(board);
  
  console.log(`Evaluación inicial: ${evaluation}`);
  
  // El tablero inicial debería tener una evaluación cercana a 0
  if (Math.abs(evaluation) < 50) {
    console.log('✅ PASSED: Evaluación inicial equilibrada');
  } else {
    console.log('❌ FAILED: Evaluación inicial desequilibrada');
  }
  
  return Math.abs(evaluation) < 50;
}

/**
 * Prueba 2: Verificar generación de movimientos
 */
function testMoveGeneration() {
  console.log('\n🧪 Prueba 2: Generación de movimientos');
  
  const board = createInitialBoard();
  const moves = generateAllMoves(board, AI_CONFIG.PLAYER_AI);
  
  console.log(`Movimientos generados para IA: ${moves.length}`);
  
  // Verificar que se generan movimientos válidos
  const hasValidMoves = moves.length > 0;
  const firstMove = moves[0];
  
  if (hasValidMoves && firstMove.from && firstMove.to && firstMove.arrow) {
    console.log('✅ PASSED: Movimientos generados correctamente');
    console.log(`Ejemplo: ${JSON.stringify(firstMove)}`);
  } else {
    console.log('❌ FAILED: No se generaron movimientos válidos');
  }
  
  return hasValidMoves;
}

/**
 * Prueba 3: Verificar aplicación de movimientos
 */
function testMoveApplication() {
  console.log('\n🧪 Prueba 3: Aplicación de movimientos');
  
  const board = createInitialBoard();
  const moves = generateAllMoves(board, AI_CONFIG.PLAYER_AI);
  
  if (moves.length === 0) {
    console.log('❌ FAILED: No hay movimientos para probar');
    return false;
  }
  
  const move = moves[0];
  const newBoard = applyMove(board, move);
  
  // Verificar que la pieza se movió correctamente
  const originalPiece = board[move.from[0]][move.from[1]];
  const movedPiece = newBoard[move.to[0]][move.to[1]];
  const clearedOriginal = newBoard[move.from[0]][move.from[1]];
  const arrowPlaced = newBoard[move.arrow[0]][move.arrow[1]];
  
  const success = (
    originalPiece === AI_CONFIG.PLAYER_AI &&
    movedPiece === AI_CONFIG.PLAYER_AI &&
    clearedOriginal === 0 &&
    arrowPlaced === 3
  );
  
  if (success) {
    console.log('✅ PASSED: Movimiento aplicado correctamente');
  } else {
    console.log('❌ FAILED: Error en aplicación de movimiento');
  }
  
  return success;
}

/**
 * Prueba 4: Verificar rendimiento del minimax
 */
function testMinimaxPerformance() {
  console.log('\n🧪 Prueba 4: Rendimiento del Minimax');
  
  const board = createInitialBoard();
  const startTime = Date.now();
  
  const result = minimax(board, 2, true); // Profundidad 2 para rapidez
  
  const elapsed = Date.now() - startTime;
  
  console.log(`Tiempo de ejecución: ${elapsed}ms`);
  console.log(`Puntuación: ${result.score}`);
  console.log(`Movimiento encontrado: ${result.move ? 'Sí' : 'No'}`);
  
  const success = elapsed < 5000 && result.move !== null;
  
  if (success) {
    console.log('✅ PASSED: Minimax ejecutado en tiempo razonable');
  } else {
    console.log('❌ FAILED: Minimax demasiado lento o sin resultado');
  }
  
  return success;
}

/**
 * Prueba 5: Verificar que la IA encuentra el mejor movimiento
 */
function testBestMoveSelection() {
  console.log('\n🧪 Prueba 5: Selección del mejor movimiento');
  
  const board = createInitialBoard();
  const bestMove = getBestMove(board, 2); // Dificultad fácil para rapidez
  
  if (bestMove && bestMove.from && bestMove.to && bestMove.arrow) {
    console.log('✅ PASSED: IA selecciona movimiento válido');
    console.log(`Mejor movimiento: ${JSON.stringify(bestMove)}`);
    return true;
  } else {
    console.log('❌ FAILED: IA no encontró movimiento válido');
    return false;
  }
}

/**
 * Prueba 6: Verificar consistencia de evaluaciones
 */
function testEvaluationConsistency() {
  console.log('\n🧪 Prueba 6: Consistencia de evaluaciones');
  
  const board = createInitialBoard();
  const eval1 = evaluateBoard(board);
  const eval2 = evaluateBoard(board);
  const eval3 = evaluateBoard(board);
  
  const consistent = (eval1 === eval2 && eval2 === eval3);
  
  if (consistent) {
    console.log('✅ PASSED: Evaluaciones consistentes');
    console.log(`Evaluación: ${eval1}`);
  } else {
    console.log('❌ FAILED: Evaluaciones inconsistentes');
    console.log(`Evaluaciones: ${eval1}, ${eval2}, ${eval3}`);
  }
  
  return consistent;
}

/**
 * Ejecutar todas las pruebas
 */
function runAllTests() {
  console.log('🎯 Iniciando pruebas del Jugador Sintético\n');
  
  const tests = [
    testInitialBoardEvaluation,
    testMoveGeneration,
    testMoveApplication,
    testMinimaxPerformance,
    testBestMoveSelection,
    testEvaluationConsistency
  ];
  
  let passed = 0;
  const total = tests.length;
  
  for (const test of tests) {
    if (test()) {
      passed++;
    }
  }
  
  console.log(`\n📊 Resultados: ${passed}/${total} pruebas exitosas`);
  
  if (passed === total) {
    console.log('🎉 ¡Todas las pruebas pasaron! El jugador sintético está funcionando correctamente.');
  } else {
    console.log('⚠️ Algunas pruebas fallaron. Revisar la implementación.');
  }
  
  return passed === total;
}

// Ejecutar pruebas si se ejecuta directamente
if (typeof window === 'undefined') {
  runAllTests();
}

export { runAllTests };
