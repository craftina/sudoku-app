import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../models/board.model';
import { Difficulty } from '../models/difficulty.model';
import { encodeBoard } from '../utils/encode-board';

@Injectable({
  providedIn: 'root'
})
export class SudokuApi {
  private baseUrl = 'https://sugoku.onrender.com/';
  constructor(private http: HttpClient) { }

  getBoard(difficulty: Difficulty): Observable<BoardModel> {
    return this.http.get<BoardModel>(this.baseUrl + "board?difficulty=" + difficulty)
  }

  solveBoard(board: BoardModel['board']): Observable<any> {
    const body = encodeBoard(board);
    return this.http.post(`${this.baseUrl}solve`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  validateBoard(board: BoardModel['board']): Observable<any> {
    const body = encodeBoard(board);
    return this.http.post(`${this.baseUrl}validate`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
