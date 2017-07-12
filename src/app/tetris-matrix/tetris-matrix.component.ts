import { Component, OnInit } from '@angular/core';
import { TetrisCellComponent } from '../tetris-cell/tetris-cell.component';
import { TetrisPositionService } from '../services/tetris-position.service';

@Component({
  selector: 'app-tetris-matrix',
  templateUrl: './tetris-matrix.component.html',
  styleUrls: ['./tetris-matrix.component.sass']
})
export class TetrisMatrixComponent implements OnInit {
  numberOfCells: number;
  cells: Array<TetrisCellComponent>;

  constructor(private tetrisPositionService: TetrisPositionService) {
    this.numberOfCells = tetrisPositionService.getNumberOfRows() * tetrisPositionService.getNumberOfColumns();
    this.cells = Array(this.numberOfCells).fill(1);
  }

  ngOnInit() {
  }

}
