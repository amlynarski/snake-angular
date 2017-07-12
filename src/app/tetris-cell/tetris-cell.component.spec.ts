import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrisCellComponent } from './tetris-cell.component';

describe('TetrisCellComponent', () => {
  let component: TetrisCellComponent;
  let fixture: ComponentFixture<TetrisCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrisCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrisCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
