import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccTaskComponent } from './acc-task.component';

describe('AccTaskComponent', () => {
  let component: AccTaskComponent;
  let fixture: ComponentFixture<AccTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
