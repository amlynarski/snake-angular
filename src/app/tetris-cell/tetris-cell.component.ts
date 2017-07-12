import { Component, Input, OnInit } from '@angular/core';
import { TetrisPositionService } from '../services/tetris-position.service';

@Component({
  selector: 'app-tetris-cell',
  templateUrl: './tetris-cell.component.html',
  styleUrls: ['./tetris-cell.component.sass']
})
export class TetrisCellComponent implements OnInit {
  @Input() index: number;

  rowNumber: number;
  columnNumber: number;
  isEmpty: boolean;

  constructor(private tetrisPositionService: TetrisPositionService) {
    this.isEmpty = true;
  }

  ngOnInit() {
    this.rowNumber = this.tetrisPositionService.calculateRowPosition(this.index);
    this.columnNumber = this.tetrisPositionService.calculateColumnPosition(this.index);
  }

}
