import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardType, BoardResponse, Difficulty } from '../models/board.model';
import { encodeBoard } from '../utils/encode-board';

export type SolveResponse = {
  difficulty: Difficulty;
  solution: BoardType;
  status: "solved" | "broken" | "unsolvable";
};

export type ValidateResponse = {
  status: "solved" | "broken" | "unsolved";
};

@Injectable({
  providedIn: 'root'
})
export class SudokuApi {
  private baseUrl = 'https://sugoku.onrender.com/';
  constructor(private http: HttpClient) { }

  getBoard(difficulty: Difficulty): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(this.baseUrl + "board?difficulty=" + difficulty)
  }

  solveBoard(board: BoardType): Observable<SolveResponse> {
    const body = encodeBoard(board);
    return this.http.post<SolveResponse>(`${this.baseUrl}solve`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  validateBoard(board: BoardType): Observable<ValidateResponse> {
    const body = encodeBoard(board);
    return this.http.post<ValidateResponse>(`${this.baseUrl}validate`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  solveBoard(board: BoardModel['board']): Observable<any> {
    const body = encodeBoard(board);
    return this.http.post(`${this.baseUrl}solve`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
