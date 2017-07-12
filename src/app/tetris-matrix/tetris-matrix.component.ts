import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tetris-matrix',
  templateUrl: './tetris-matrix.component.html',
  styleUrls: ['./tetris-matrix.component.sass']
})
export class TetrisMatrixComponent implements OnInit {
  numberOfCells = 200;
  cells: Array<any>;

  constructor() {
    this.cells = Array(this.numberOfCells).fill(1);
  }

  ngOnInit() {
  }

}
