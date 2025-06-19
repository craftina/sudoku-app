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
  newBoard: BoardModel['board'] = [];
  difficulties: string[] = Object.values(Difficulty);
  selectedDifficulty: Difficulty = Difficulty.Random;
  constructor(private api: SudokuApi) { }

  ngOnInit() {
    this.api.getBoard(Difficulty.Random).subscribe({
      next: (response) => {
        this.board = response.board.map(row => [...row]);
        this.newBoard = response.board.map(row => [...row]);
      },
      error: (err) => {
        console.error('Failed to fetch board', err);
      }
    });
  }

  startNewGame(): void {
    this.api.getBoard(this.selectedDifficulty).subscribe({
      next: (response) => {
        this.board = response.board;
        this.newBoard = response.board;
      },
      error: (err) => {
        console.error('Failed to fetch board', err);
      }
    });
  }

  validateInput(event: KeyboardEvent): void {
    const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  updateCellValue(event: Event, row: number, col: number): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const value = input.value;
    if (value === '') {
      this.newBoard[row][col] = 0;
    } else {
      const num = parseInt(value, 10);
      this.newBoard[row][col] = isNaN(num) ? 0 : num;
    }
  }

  handleSolve(): void {
    this.api.solveBoard(this.newBoard).subscribe({
      next: (res) => {
        console.log('Solved:', res.solution);
        if(res.status === "solved"){
          this.board = res.solution;
        } else{
          alert("This sudoku is unsolvable!");
        }
      },
      error: (err) => {
        console.error('Solving failed', err);
      }
    });
  }
}
