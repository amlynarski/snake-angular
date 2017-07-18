import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TetrisPositionService } from '../tetris-position/tetris-position.service';

enum Direction {
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
  direction: Direction = Direction.left;
  nextDirection: Direction = Direction.left;
  intervalTime: number;
  snakeArr: Array<ISnakeBody>;
  snakeElements: Subject<Array<ISnakeBody>>;
  numberOfCellsInMatrix: number;
  foodElement: Subject<number>;
  foodElementIndex: number;

  constructor(private tetrisPositionService: TetrisPositionService) {
    this.intervalTime = 100;
    this.numberOfCellsInMatrix = tetrisPositionService.getNumberOfColumns() * tetrisPositionService.getNumberOfRows();
    this.initSnake();
    this.snakeElements = new Subject();
    this.foodElement = new Subject();
    this.startSnake();

    const snakeBody = this.snakeElements.subscribe( // todo unsubscribe
      (x) => { this.snakeArr = x.map( (item: ISnakeBody) => item ) }
    );
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
        index: 34
      },
      {
        isHead: false,
        index: 35
      },
      {
        isHead: false,
        index: 36
      }
    ];
  }

  private startSnake() {
    setInterval(
      () => this.move(),
      this.intervalTime
    )
  }

  private move() {
    this.direction = this.nextDirection;
    switch (this.nextDirection) {
      case Direction.up:
        this.snakeUp();
        break;
      case Direction.down:
        this.snakeDown();
        break;
      case Direction.right:
        this.snakeRight();
        break;
      case Direction.left:
        this.snakeLeft();
        break;
    }

    this.snakeElements.next(
      this.snakeArr
    )
  }

  private snakeUp() {
    this.calculateSnakePosition(-this.tetrisPositionService.getNumberOfColumns());
  }

  private snakeDown() {
    this.calculateSnakePosition(this.tetrisPositionService.getNumberOfColumns());
  }

  private snakeRight() {
    this.calculateSnakePosition(1);

  }

  private snakeLeft() {
    this.calculateSnakePosition(-1);
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

  private updateFoodElement(index: number) {
    this.foodElementIndex = index;
    this.foodElement.next(index);
  }

}
