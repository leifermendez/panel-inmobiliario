import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBookingComponent } from './calendar-booking.component';

describe('CalendarBookingComponent', () => {
  let component: CalendarBookingComponent;
  let fixture: ComponentFixture<CalendarBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
