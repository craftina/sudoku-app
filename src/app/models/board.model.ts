export type BoardType = number[][];

export interface BoardResponse {
    board: BoardType;
}

export type Difficulty = "easy" | "medium" | "hard" | "random";

