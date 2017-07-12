import { Injectable } from '@angular/core';

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
  snakeElements: ISnakeBody[];

  constructor() {
    this.intervalTime = 500;
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

  private startSnake() {
    setInterval(
      () => this.move(),
      this.intervalTime
    )
  }

  private move() {
    console.log('MOVE: ', this.direction);
    // todo use observable and subscribe to method to update position of snake in matrix component (it would be a stream)
  }

}
