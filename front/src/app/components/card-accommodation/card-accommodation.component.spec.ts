import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAccommodationComponent } from './card-accommodation.component';

describe('CardAccommodationComponent', () => {
  let component: CardAccommodationComponent;
  let fixture: ComponentFixture<CardAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
