export interface Move {
  player: number;
  from: number[];
  to: number[];
  arrow: number[];
}

export enum GamePhase {
  SELECT_PIECE,
  SELECT_DESTINATION,
  SHOOT_ARROW
}