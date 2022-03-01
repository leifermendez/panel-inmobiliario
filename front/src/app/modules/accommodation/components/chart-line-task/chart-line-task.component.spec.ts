import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineTaskComponent } from './chart-line-task.component';

describe('ChartLineTaskComponent', () => {
  let component: ChartLineTaskComponent;
  let fixture: ComponentFixture<ChartLineTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartLineTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLineTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
