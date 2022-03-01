import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieTaskSingleComponent } from './chart-pie-task-single.component';

describe('ChartPieTaskSingleComponent', () => {
  let component: ChartPieTaskSingleComponent;
  let fixture: ComponentFixture<ChartPieTaskSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieTaskSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieTaskSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
