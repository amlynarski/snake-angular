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

@Injectable()
export class TetrisSnakeService {
  direction: Direction = Direction.left;
  nextDirection: Direction = Direction.left;
  intervalTime: number;
  snakeArr: Array<ISnakeBody>;
  snakeElements: Subject<Array<ISnakeBody>>;

  constructor(private tetrisPositionService: TetrisPositionService) {
    this.intervalTime = 250;
    this.initSnake();
    this.snakeElements = new Subject();
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

  getBodyElements() {
    return this.snakeArr;
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
    // todo check if there is some food for snake
    this.snakeArr = [
      {
        isHead: true,
        index: this.snakeArr[0].index - this.tetrisPositionService.getNumberOfColumns()
      },
      ...this.snakeArr.slice(0, -1)
    ];
    this.snakeArr[1].isHead = false;
  }

  private snakeDown() {
    this.snakeArr = [
      {
        isHead: true,
        index: this.snakeArr[0].index + this.tetrisPositionService.getNumberOfColumns()
      },
      ...this.snakeArr.slice(0, -1)
    ];
    this.snakeArr[1].isHead = false;
  }

  private snakeRight() {
    this.snakeArr = [
      {
        isHead: true,
        index: this.snakeArr[0].index + 1
      },
      ...this.snakeArr.slice(0, -1)
    ];
    this.snakeArr[1].isHead = false;

  }

  private snakeLeft() {
    this.snakeArr = [
      {
        isHead: true,
        index: this.snakeArr[0].index - 1
      },
      ...this.snakeArr.slice(0, -1)
    ];
    this.snakeArr[1].isHead = false;
  }

}
