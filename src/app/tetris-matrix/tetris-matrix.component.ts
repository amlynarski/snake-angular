import { Component, OnInit, HostListener } from '@angular/core';
import { TetrisPositionService } from '../services/tetris-position/tetris-position.service';
import { ISnakeBody, TetrisSnakeService } from '../services/tetris-snake/tetris-snake.service';
import { TetrisCell } from 'app/tetris-cell/tetris-cell.class';

@Component({
  selector: 'app-tetris-matrix',
  templateUrl: './tetris-matrix.component.html',
  styleUrls: ['./tetris-matrix.component.sass']
})
export class TetrisMatrixComponent implements OnInit {
  numberOfCells: number;
  cells: Array<TetrisCell>;

  constructor(
    private tetrisPositionService: TetrisPositionService,
    private snake: TetrisSnakeService
  ) {
    this.numberOfCells = tetrisPositionService.getNumberOfRows() * tetrisPositionService.getNumberOfColumns();
    this.initCells();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch (ev.code) {
      case 'ArrowUp':
        this.snake.onKeyUp();
        break;
      case 'ArrowDown':
        this.snake.onKeyDown();
        break;
      case 'ArrowLeft':
        this.snake.onKeyLeft();
        break;
      case 'ArrowRight':
        this.snake.onKeyRight();
        break;
      default:
        break;
    }
  }

  initCells() {
    this.cells = [];
    for (let i = 0; i < this.numberOfCells ; i++) {
      this.cells.push(new TetrisCell())
    }
  }

  clearCells() {
    for (let i = 0; i < this.numberOfCells ; i++) {
      this.cells[i].clear();
    }
  }

  updateCellsWithSnakeDirections(snakeBodyArray: ISnakeBody[]) {
    this.clearCells();
    snakeBodyArray.forEach(
      (snakeBodyElement: ISnakeBody) => {
        const cell = this.cells[snakeBodyElement.index];
        if (cell) {
          cell.color =  snakeBodyElement.isHead ? 'red' : 'blue';
          cell.isEmpty = false;
        }
      }
    )
  }

  ngOnInit() {
    const subscription = this.snake.onMove()
      .subscribe(
        () => { this.updateCellsWithSnakeDirections(this.snake.getBodyElements()) },
        () => { console.log('error')},
        () => { console.log('completed')}
      )
  }

}
