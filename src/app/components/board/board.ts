import { Component } from '@angular/core';
import { SudokuApi } from '../../services/sudoku-api';
import { OnInit } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  board: BoardModel['board'] = [];
  constructor(private api: SudokuApi){}

  ngOnInit(){
      this.api.getBoard().subscribe({
    next: (response) => {
      this.board = response.board;
      console.log('Sudoku board:', response.board);
    },
    error: (err) => {
      console.error('Failed to fetch board', err);
    }
  });
  }
}
