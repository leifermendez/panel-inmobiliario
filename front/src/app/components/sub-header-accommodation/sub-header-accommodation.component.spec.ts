import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderAccommodationComponent } from './sub-header-accommodation.component';

describe('SubHeaderAccommodationComponent', () => {
  let component: SubHeaderAccommodationComponent;
  let fixture: ComponentFixture<SubHeaderAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeaderAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeaderAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
