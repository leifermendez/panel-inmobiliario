import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCustomCountryComponent } from './field-custom-country.component';

describe('FieldCustomCountryComponent', () => {
  let component: FieldCustomCountryComponent;
  let fixture: ComponentFixture<FieldCustomCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCustomCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCustomCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
