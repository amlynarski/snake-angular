import { Component, Input, OnInit } from '@angular/core';
import { TetrisPositionService } from '../services/tetris-position/tetris-position.service';

@Component({
  selector: 'app-tetris-cell',
  templateUrl: './tetris-cell.component.html',
  styleUrls: ['./tetris-cell.component.sass']
})
export class TetrisCellComponent implements OnInit {
  @Input() index: number;
  @Input() color: string;

  rowNumber: number;
  columnNumber: number;

  constructor(private tetrisPositionService: TetrisPositionService) {}

  ngOnInit() {
    this.rowNumber = this.tetrisPositionService.calculateRowPosition(this.index);
    this.columnNumber = this.tetrisPositionService.calculateColumnPosition(this.index);
  }

}
