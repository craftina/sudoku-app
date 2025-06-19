import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../models/board.model';
import { Difficulty } from '../models/difficulty.model';

@Injectable({
  providedIn: 'root'
})
export class SudokuApi {
  private baseUrl = 'https://sugoku.onrender.com/';
  constructor(private http: HttpClient) { }

  getBoard(difficulty: Difficulty): Observable<BoardModel> {
    return this.http.get<BoardModel>(this.baseUrl + "board?difficulty=" + difficulty)
  }
}
