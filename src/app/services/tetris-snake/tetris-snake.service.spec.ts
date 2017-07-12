import { TestBed, inject } from '@angular/core/testing';

import { TetrisSnakeService } from './tetris-snake.service';

describe('TetrisSnakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TetrisSnakeService]
    });
  });

  it('should be created', inject([TetrisSnakeService], (service: TetrisSnakeService) => {
    expect(service).toBeTruthy();
  }));
});
