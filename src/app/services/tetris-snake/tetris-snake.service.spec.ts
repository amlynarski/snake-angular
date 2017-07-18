import { TestBed, inject, tick, fakeAsync, async, discardPeriodicTasks, flushMicrotasks } from '@angular/core/testing';

import { Direction, TetrisSnakeService } from './tetris-snake.service';
import { TetrisPositionService } from '../tetris-position/tetris-position.service';

describe('TetrisSnakeService', () => {
  let service: TetrisSnakeService;
  let firstIndex: number;
  beforeEach(() => {
    service = new TetrisSnakeService(new TetrisPositionService());
    firstIndex = service.snakeArr[0].index;
  });

  it('should init snake array with 3 elements', () => {
    expect(service.snakeArr.length).toEqual(3);
  });

  it('should change direction if next direction is 90 deg to current', () => {
    expect(service.direction).toEqual(Direction.right);
    service.onKeyUp();
    expect(service.nextDirection).toEqual(Direction.up);
  });

  it('should not change direction if is in opposition to current', () => {
    expect(service.direction).toEqual(Direction.right);
    service.onKeyLeft();
    expect(service.nextDirection).toEqual(Direction.right);
  });

  it('should change snake position to right after move', fakeAsync(() => {
    service = new TetrisSnakeService(new TetrisPositionService());
    expect(service.snakeArr.length).toEqual(3);
    expect(service.snakeArr[0].index).toEqual(firstIndex);
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + 1);
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + 2);
    discardPeriodicTasks();
  }));

  it('should change snake position to bottom after move', fakeAsync(() => {
    const positionService = new TetrisPositionService();
    service = new TetrisSnakeService(positionService);
    expect(service.snakeArr.length).toEqual(3);
    service.onKeyDown();
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + positionService.getNumberOfColumns());
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + 2 * positionService.getNumberOfColumns());
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + 3 * positionService.getNumberOfColumns());
    discardPeriodicTasks();
  }));

  it('should stop when hit the wall on right', fakeAsync(() => {
    const positionService = new TetrisPositionService();
    service = new TetrisSnakeService(positionService);
    tick(service.intervalTime * (positionService.getNumberOfColumns()));
    expect(service.snakeArr[0].index).toEqual(positionService.getNumberOfColumns() - 1);
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(positionService.getNumberOfColumns() - 1);
    discardPeriodicTasks();
  }));

  it('should stop when hit the wall on bottom', fakeAsync(() => {
    const positionService = new TetrisPositionService();
    service = new TetrisSnakeService(positionService);
    service.onKeyDown();
    tick(service.intervalTime * (positionService.getNumberOfRows()));
    expect(service.snakeArr[0].index).toEqual(firstIndex + (positionService.getNumberOfRows() - 1 ) * positionService.getNumberOfColumns());
    tick(service.intervalTime);
    expect(service.snakeArr[0].index).toEqual(firstIndex + (positionService.getNumberOfRows() - 1 ) * positionService.getNumberOfColumns());
    discardPeriodicTasks();
  }));

  it('should increase length when eat food', fakeAsync(() => {
    const positionService = new TetrisPositionService();
    service = new TetrisSnakeService(positionService);
    service.foodElementIndex = 5;
    expect(service.snakeArr.length).toEqual(3);
    tick(service.intervalTime * (service.foodElementIndex - firstIndex));
    expect(service.snakeArr.length).toEqual(4);
    discardPeriodicTasks();
  }));



});
