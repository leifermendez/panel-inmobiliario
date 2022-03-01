import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCustomCalendarComponent } from './field-custom-calendar.component';

describe('FieldCustomCalendarComponent', () => {
  let component: FieldCustomCalendarComponent;
  let fixture: ComponentFixture<FieldCustomCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCustomCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCustomCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
