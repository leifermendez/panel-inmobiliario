import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStepperComponent } from './first-stepper.component';

describe('FirstStepperComponent', () => {
  let component: FirstStepperComponent;
  let fixture: ComponentFixture<FirstStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
