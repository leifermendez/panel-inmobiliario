import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCustomSelectComponent } from './field-custom-select.component';

describe('FieldCustomSelectComponent', () => {
  let component: FieldCustomSelectComponent;
  let fixture: ComponentFixture<FieldCustomSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCustomSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
