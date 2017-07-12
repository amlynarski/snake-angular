import { TestBed, inject } from '@angular/core/testing';

import { TetrisPositionService } from './tetris-position.service';

describe('TetrisPositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TetrisPositionService]
    });
  });

  it('should be created', inject([TetrisPositionService], (service: TetrisPositionService) => {
    expect(service).toBeTruthy();
  }));
});
