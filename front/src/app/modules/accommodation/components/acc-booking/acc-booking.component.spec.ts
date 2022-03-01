import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccBookingComponent } from './acc-booking.component';

describe('AccBookingComponent', () => {
  let component: AccBookingComponent;
  let fixture: ComponentFixture<AccBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
