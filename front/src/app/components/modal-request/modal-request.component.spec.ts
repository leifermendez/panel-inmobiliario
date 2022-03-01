import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequestComponent } from './modal-request.component';

describe('ModalRequestComponent', () => {
  let component: ModalRequestComponent;
  let fixture: ComponentFixture<ModalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
