import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TetrisMatrixComponent } from './tetris-matrix/tetris-matrix.component';
import { TetrisCellComponent } from './tetris-cell/tetris-cell.component';
import { TetrisPositionService } from './services/tetris-position.service';

@NgModule({
  declarations: [
    AppComponent,
    TetrisMatrixComponent,
    TetrisCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TetrisPositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
