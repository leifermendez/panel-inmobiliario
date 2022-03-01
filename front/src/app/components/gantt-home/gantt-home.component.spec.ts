import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttHomeComponent } from './gantt-home.component';

describe('GanttHomeComponent', () => {
  let component: GanttHomeComponent;
  let fixture: ComponentFixture<GanttHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
