export interface ITetrisCell {
  isEmpty: boolean;
  color: string;
}

export class TetrisCell {
  isEmpty: boolean;
  color: string;

  constructor(params?: ITetrisCell) {
    this.isEmpty = params ? params.isEmpty : true;
    this.color = params ? params.color : 'white';
  }

  clear() {
    this.isEmpty = true;
    this.color = 'white';
  }
}
