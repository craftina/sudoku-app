import { BoardModel } from "../models/board.model";

export function encodeBoard(board: BoardModel['board']): string {
  const encode = (board: BoardModel['board']) =>
    board.map(row => `%5B${row.join('%2C')}%5D`).join('%2C');
  return `board=%5B${encode(board)}%5D`;
}
