import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccEditComponent } from './acc-edit.component';

describe('AccEditComponent', () => {
  let component: AccEditComponent;
  let fixture: ComponentFixture<AccEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
