import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TetrisMatrixComponent } from './tetris-matrix/tetris-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    TetrisMatrixComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
