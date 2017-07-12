import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisMatrixComponent } from './tetris-matrix.component';

describe('TetrisMatrixComponent', () => {
  let component: TetrisMatrixComponent;
  let fixture: ComponentFixture<TetrisMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
