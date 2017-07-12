import { Component, OnInit, HostListener } from '@angular/core';
import { TetrisCellComponent } from '../tetris-cell/tetris-cell.component';
import { TetrisPositionService } from '../services/tetris-position/tetris-position.service';
import { TetrisSnakeService } from '../services/tetris-snake/tetris-snake.service';

@Component({
  selector: 'app-tetris-matrix',
  templateUrl: './tetris-matrix.component.html',
  styleUrls: ['./tetris-matrix.component.sass']
})
export class TetrisMatrixComponent implements OnInit {
  numberOfCells: number;
  cells: Array<TetrisCellComponent>;

  constructor(
    private tetrisPositionService: TetrisPositionService,
    private snake: TetrisSnakeService
  ) {
    this.numberOfCells = tetrisPositionService.getNumberOfRows() * tetrisPositionService.getNumberOfColumns();
    this.cells = Array(this.numberOfCells);
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

  ngOnInit() {
  }

}
