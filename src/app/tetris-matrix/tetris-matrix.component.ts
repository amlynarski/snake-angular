import { Component, OnInit, HostListener } from '@angular/core';
import { TetrisPositionService } from '../services/tetris-position/tetris-position.service';
import { FOOD_CELL_COLOR, ISnakeBody, SNAKE_BODY_COLOR, TetrisSnakeService } from '../services/tetris-snake/tetris-snake.service';
import { TetrisCell } from 'app/tetris-cell/tetris-cell.class';

@Component({
  selector: 'app-tetris-matrix',
  templateUrl: './tetris-matrix.component.html',
  styleUrls: ['./tetris-matrix.component.sass']
})
export class TetrisMatrixComponent implements OnInit {
  numberOfCells: number;
  cells: Array<TetrisCell>;
  foodCellIndex: number;

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
      case 'Enter':
        this.snake.start();
      default:
        console.log(ev.code);
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
    for (const cell of this.cells) {
      cell.clear();
    }
  }

  updateCellsWithSnakeDirections(snakeBodyArray: ISnakeBody[]) {
    this.clearCells();
    this.updateCellsWithFood();
    snakeBodyArray.forEach(
      (snakeBodyElement: ISnakeBody) => {
        const cell = this.cells[snakeBodyElement.index];
        if (cell) {
          cell.color =  snakeBodyElement.isHead ? FOOD_CELL_COLOR : SNAKE_BODY_COLOR;
          cell.isEmpty = false;
        }
      }
    )
  }

  updateCellsWithFood() {
    const cell = this.cells[this.foodCellIndex];
    if (cell) {
      cell.color = FOOD_CELL_COLOR;
      cell.isEmpty = false;
    }
  }

  updateCellIndex(index: number) {
    this.foodCellIndex = index;
  }

  ngOnInit() {
    const snakeSubscription = this.snake.onMove()
      .subscribe(
        () => { this.updateCellsWithSnakeDirections(this.snake.getBodyElements()) },
        () => { console.log('error')},
        () => { console.log('completed')}
      );

    const updateFoodElementSubscription = this.snake.onUpdateFoodElement()
      .subscribe(
        (foodIndex) => { this.updateCellIndex(foodIndex) },
        () => { console.log('error')},
        () => { console.log('completed')}
      );

    this.snake.generateFood();
  }

}
