import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCustomMapBoxComponent } from './field-custom-map-box.component';

describe('FieldCustomMapBoxComponent', () => {
  let component: FieldCustomMapBoxComponent;
  let fixture: ComponentFixture<FieldCustomMapBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCustomMapBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCustomMapBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
