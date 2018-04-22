import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TetrisPositionService } from '../tetris-position/tetris-position.service';

export enum Direction {
  up,
  down,
  left,
  right
}

export interface ISnakeBody {
  index: number;
  isHead: boolean;
}

export const FOOD_CELL_COLOR = 'red';
export const EMPTY_CELL_COLOR = 'white';
export const SNAKE_BODY_COLOR = 'blue';

@Injectable()
export class TetrisSnakeService {
  direction: Direction = Direction.right;
  nextDirection: Direction = Direction.right;
  intervalTime: number;
  snakeArr: Array<ISnakeBody>;
  snakeElements: Subject<Array<ISnakeBody>>;
  numberOfCellsInMatrix: number;
  foodElement: Subject<number>;
  foodElementIndex: number;

  constructor(private tetrisPositionService: TetrisPositionService) {
    this.intervalTime = 150;
    this.numberOfCellsInMatrix = tetrisPositionService.getNumberOfColumns() * tetrisPositionService.getNumberOfRows();
    this.initSnake();
    this.snakeElements = new Subject();
    this.foodElement = new Subject();
    // this.startSnake();
  }

  onKeyUp() {
    if (this.direction !== Direction.down) {
      this.nextDirection = Direction.up;
    }
  }

  onKeyDown() {
    if (this.direction !== Direction.up) {
      this.nextDirection = Direction.down;
    }
  }

  onKeyLeft() {
    if (this.direction !== Direction.right) {
      this.nextDirection = Direction.left;
    }
  }

  onKeyRight() {
    if (this.direction !== Direction.left) {
      this.nextDirection = Direction.right;
    }
  }

  start() {
    this.startSnake();
  }

  onMove() {
    return this.snakeElements;
  }

  onUpdateFoodElement() {
    return this.foodElement;
  }

  getBodyElements() {
    return this.snakeArr;
  }

  generateFood() {
    let foodElementIndex;

    while (true) {
      foodElementIndex = Math.floor(Math.random() * this.numberOfCellsInMatrix);
      if (this.snakeArr.find(({index}) => index !== foodElementIndex)){
        break;
      }
    }

    this.updateFoodElement(foodElementIndex);
  }

  private initSnake() {
    this.snakeArr = [
      {
        isHead: true,
        index: 3
      },
      {
        isHead: false,
        index: 2
      },
      {
        isHead: false,
        index: 1
      }
    ];
  }

  private startSnake() {
    setInterval(
      () => this.move(),
      this.intervalTime
    );
  }

  private move() {
    this.direction = this.nextDirection;
    const snakeHeadIndex = this.snakeArr[0].index;

    if (!this.isNextMoveWall(snakeHeadIndex, this.nextDirection)) {
      let offset;
      switch (this.nextDirection) {
        case Direction.up:
          offset = -this.tetrisPositionService.getNumberOfColumns();
          this.calculateSnakePosition(offset);
          break;
        case Direction.down:
          offset = this.tetrisPositionService.getNumberOfColumns();
          this.calculateSnakePosition(offset);
          break;
        case Direction.right:
          offset = 1;
          this.calculateSnakePosition(offset);
          break;
        case Direction.left:
          offset = -1;
          this.calculateSnakePosition(offset);
          break;
      }

      if (!this.isNextMoveSnakeBody(offset)) {
        this.snakeElements.next(
          this.snakeArr
        );
      } else {
        this.snakeElements.complete();
        this.foodElement.complete();
      }

    } else {
      this.snakeElements.complete();
      this.foodElement.complete();
    }
  }

  private calculateSnakePosition(offset: number) {
    let currentSnakeArr = this.snakeArr;

    if (this.snakeArr[0].index + offset !== this.foodElementIndex) {
      currentSnakeArr = this.snakeArr.slice(0, -1);
    } else {
      this.generateFood();
    }

    this.snakeArr = [
      {
        isHead: true,
        index: this.snakeArr[0].index + offset
      },
      ...currentSnakeArr
    ];
    this.snakeArr[1].isHead = false;
  }

  private isNextMoveWall(snakeHeadIndex: number, direction: Direction) {
    switch (direction) {
      case Direction.up:
        return this.tetrisPositionService.isFirstRow(snakeHeadIndex);
      case Direction.down:
        return this.tetrisPositionService.isLastRow(snakeHeadIndex);
      case Direction.right:
        return this.tetrisPositionService.isLastColumn(snakeHeadIndex);
      case Direction.left:
        return this.tetrisPositionService.isFirstColumn(snakeHeadIndex);
    }
  }

  private isNextMoveSnakeBody(offset) {
    const headIndex = this.snakeArr[0].index;
    const tailIndex = this.snakeArr.slice(-1)[0].index;
    return this.snakeArr.find( ({index}) => headIndex + offset === index ) && (headIndex + offset !== tailIndex)
  }

  private updateFoodElement(index: number) {
    this.foodElementIndex = index;
    this.foodElement.next(index);
  }

}
