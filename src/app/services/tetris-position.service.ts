import { Injectable } from '@angular/core';

@Injectable()
export class TetrisPositionService {
  private numberOfRows = 20; // todo find a way to use it in sass
  private numberOfColumns = 10; // todo find a way to use it in sass

  constructor() { }

  getNumberOfRows = (): number => {
    return this.numberOfRows;
  }

  getNumberOfColumns = (): number => {
    return this.numberOfColumns;
  }

  calculateColumnPosition = (index: number): number => {
    return index % this.numberOfColumns + 1;
  }

  calculateRowPosition  = (index: number): number => {
    return Math.floor(index / this.numberOfColumns) + 1;
  }

}
