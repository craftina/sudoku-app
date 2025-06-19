import { Component } from '@angular/core';
import { SudokuApi } from '../../services/sudoku-api';
import { BoardModel } from '../../models/board.model';
import { CommonModule } from '@angular/common';
import { Difficulty } from '../../models/difficulty.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board {
  board: BoardModel['board'] = [];
  difficulties: string[] = Object.values(Difficulty);
  selectedDifficulty: Difficulty = Difficulty.Random;
  constructor(private api: SudokuApi){}

  ngOnInit(){
      this.api.getBoard(Difficulty.Random).subscribe({
    next: (response) => {
      this.board = response.board;
    },
    error: (err) => {
      console.error('Failed to fetch board', err);
    }
  });
  }

  startNewGame(): void{
    this.api.getBoard(this.selectedDifficulty).subscribe({
    next: (response) => {
      this.board = response.board;
    },
    error: (err) => {
      console.error('Failed to fetch board', err);
    }
  });
  }

}
