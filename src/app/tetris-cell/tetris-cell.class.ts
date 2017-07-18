import { EMPTY_CELL_COLOR } from '../services/tetris-snake/tetris-snake.service';

export interface ITetrisCell {
  isEmpty: boolean;
  color: string;
}

export class TetrisCell {
  isEmpty: boolean;
  color: string;

  constructor(params?: ITetrisCell) {
    this.isEmpty = params ? params.isEmpty : true;
    this.color = params ? params.color : EMPTY_CELL_COLOR;
  }

  clear() {
    this.isEmpty = true;
    this.color = EMPTY_CELL_COLOR;
  }
}
