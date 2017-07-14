import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

enum Direction {
  up,
  down,
  left,
  right
}

interface ISnakeBody {
  index: number;
  isHead: boolean;
}

@Injectable()
export class TetrisSnakeService {
  direction: Direction = Direction.right;
  intervalTime: number;
  snakeElements: Subject<Array<ISnakeBody>>;

  constructor() {
    this.intervalTime = 500;
    this.snakeElements = new Subject();
    this.startSnake();
  }

  onKeyUp() {
    this.direction = Direction.up;
  }

  onKeyDown() {
    this.direction = Direction.down;
  }

  onKeyLeft() {
    this.direction = Direction.left;
  }

  onKeyRight() {
    this.direction = Direction.right;
  }

  onMove() {
    return this.snakeElements;
  }

  private startSnake() {
    setInterval(
      () => this.move(),
      this.intervalTime
    )
  }

  private move() {
    this.snakeElements.next(
      [{
        index: this.direction,
        isHead: true
      }]
    )
  }

}
